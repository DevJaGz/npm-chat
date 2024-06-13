import { Injectable, WritableSignal, signal } from '@angular/core';
import { LLMReport } from '@models';

export interface NpmChatState {
  llmReport: WritableSignal<LLMReport>;
}

export const InitialNpmChatState = signal<NpmChatState>({
  llmReport: signal<LLMReport>({
    progress: 0,
    text: '',
    timeElapsed: 0,
  }),
});

@Injectable()
export class NpmChatStore {
  readonly #state = InitialNpmChatState;

  readonly selectState = this.#state.asReadonly();
  readonly selectLlmReport = this.selectState().llmReport.asReadonly();

  setLlmReport(value: LLMReport): void {
    const state = this.#state().llmReport;
    state.set(value);
  }
}
