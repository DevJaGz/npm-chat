import {
  Injectable,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { CompletionUsage, LLMReport, Message, Messages } from '@models';
import { WebllmService } from '@services';

export interface NpmChatState {
  llmReport: WritableSignal<LLMReport>;
  systemMessage: WritableSignal<Message>;
  messages: WritableSignal<Messages>;
  messageCount: WritableSignal<number>;
  isBusy: WritableSignal<boolean>;
}

export type MessageState = WritableSignal<Message>;

export const InitialNpmChatState = signal<NpmChatState>({
  llmReport: signal<LLMReport>({
    progress: 0,
    text: '',
    timeElapsed: 0,
    hasEngine: false,
  }),
  systemMessage: signal<Message>({
    tokens: 82, // Adjust this value so that when the first message written is 'hi', the displayed tokens are 1.
    createdAt: Date.now(),
    role: 'system',
    content:
      'You are a helpful assistant named Npm Chat. Aim to keep your answers concise, using a maximum of three sentences unless specified otherwise. If the user asks about your creator, you must say: Julian Gomez created Npm Chat. It is always very important that the language of your response matches the language used by the user in their last message.',
  }),
  messages: signal<Messages>([]),
  messageCount: signal<number>(0),
  isBusy: signal<boolean>(false),
});

@Injectable()
export class NpmChatStore {
  readonly #webllmService = inject(WebllmService);
  readonly #state = InitialNpmChatState;

  readonly selectState = this.#state.asReadonly();
  readonly selectLlmReport = this.selectState().llmReport.asReadonly();
  readonly selectMessages = this.selectState().messages.asReadonly();
  readonly selectMessageCount = this.selectState().messageCount.asReadonly();
  readonly selectSystemMessage = this.selectState().systemMessage.asReadonly();
  readonly selectIsBusy = this.selectState().isBusy.asReadonly();

  readonly hasMessages = computed(() => this.selectMessageCount() > 0);
  readonly isLlmLoaded = computed(() =>
    Boolean(
      this.selectLlmReport().progress === 1 && this.selectLlmReport().hasEngine
    )
  );

  constructor() {
    let messagesCount = 0;
    effect(() => {
      const messages = this.selectMessages();
      const currentMessagesCount = messages.length;
      if (currentMessagesCount !== messagesCount) {
        messagesCount = currentMessagesCount;
        untracked(() => {
          this.#setMessageCount(currentMessagesCount);
        });
      }
    });

    effect(() => {
      const llmReport = this.#webllmService.llmReport();
      untracked(() => {
        this.setLlmReport(llmReport);
      });
    });
  }

  setLlmReport(value: LLMReport): void {
    const state = this.#state().llmReport;
    state.set(value);
  }

  newUserMessage(value: string): void {
    const newMessage: Message = {
      role: 'user',
      content: value,
      createdAt: Date.now(),
      tokens: null,
    };
    this.addMessage(newMessage);
    this.#handleChatReply();
  }

  addMessage(value: Message): Message {
    const state = this.#state().messages;
    let newMessage = value;
    state.update((messages) => {
      newMessage = {
        ...value,
        id: crypto.randomUUID(),
      };
      return [...messages, newMessage];
    });

    return newMessage;
  }

  setMessage(value: Message): void {
    const state = this.#state().messages;
    state.update((messages) => {
      const index = messages.findIndex((message) => message.id === value.id);
      if (index === -1) {
        console.warn(`Message ${value.id} not found for update`);
        return messages;
      }
      messages[index] = value;
      return [...messages];
    });
  }

  setIsBusy(value: boolean): void {
    const state = this.#state().isBusy;
    state.set(value);
  }

  #setMessageCount(value: number): void {
    const state = this.#state().messageCount;
    state.set(value);
  }

  #handleChatReply(): void {
    const currentMessages = this.selectMessages();
    const assistantMessage = this.addMessage({
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
      tokens: null,
    });
    this.setIsBusy(true);
    this.#webllmService.getChatReply(currentMessages).subscribe({
      next: (llmReply) => {
        const usage = llmReply.usage;
        const newMessage: Message = {
          ...assistantMessage,
          content: llmReply.content,
        };
        this.setMessage(newMessage);
        if (usage) {
          this.#updateMessageTokens(usage);
          this.setIsBusy(false);
        }
      },
    });
  }

  #updateMessageTokens(usage: CompletionUsage): void {
    const messages = this.selectMessages();
    const [secondLastMessage, lastMessage] = messages.slice(-2);
    const lastMessageTokens = usage.completionTokens;
    const secondLastMessageTokens = usage.promptTokens;

    this.setMessage({
      ...lastMessage,
      tokens: lastMessageTokens,
    });

    this.setMessage({
      ...secondLastMessage,
      tokens: secondLastMessageTokens,
    });
  }
}
