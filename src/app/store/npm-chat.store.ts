import {
  Injectable,
  WritableSignal,
  computed,
  effect,
  signal,
  untracked,
} from '@angular/core';
import { LLMReport, Message, Messages } from '@models';

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
    tokens: 50,
    createdAt: Date.now(),
    role: 'system',
    content:
      'You are a helpful assistant. The language of your responses should match the language used by the user. Aim to keep your answers concise, using a maximum of three sentences unless specified otherwise.',
  }),
  messages: signal<Messages>([]),
  messageCount: signal<number>(0),
  isBusy: signal<boolean>(false),
});

@Injectable()
export class NpmChatStore {
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
  }

  setLlmReport(value: LLMReport): void {
    const state = this.#state().llmReport;
    state.set(value);
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
}
