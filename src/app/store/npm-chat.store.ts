import { Injectable, WritableSignal, signal } from '@angular/core';
import { LLMReport, Message } from '@models';

export interface NpmChatState {
  llmReport: WritableSignal<LLMReport>;
  messages: WritableSignal<MessageState[]>;
}

export type MessageState = WritableSignal<Message>;

export const InitialNpmChatState = signal<NpmChatState>({
  llmReport: signal<LLMReport>({
    progress: 0,
    text: '',
    timeElapsed: 0,
  }),
  messages: signal<MessageState[]>([]),
});

@Injectable()
export class NpmChatStore {
  readonly #state = InitialNpmChatState;

  readonly selectState = this.#state.asReadonly();
  readonly selectLlmReport = this.selectState().llmReport.asReadonly();
  readonly selectMessages = this.selectState().messages.asReadonly();

  setLlmReport(value: LLMReport): void {
    const state = this.#state().llmReport;
    state.set(value);
  }

  addMessage(value: Message): void {
    const state = this.#state().messages;
    state.update((messages) => {
      const newMessage = signal(value);
      return [...messages, newMessage];
    });
  }

  setMessage(value: Message): void {
    const state = this.#state().messages;
    state.update((messages) => {
      const index = messages.findIndex(
        (message) => message().index === value.index
      );
      if (index === -1) {
        console.warn(`Message ${value.index} not found for update`);
        return messages;
      }
      const message = messages[index];
      message.set(value);
      return [...messages, message];
    });
  }
}
