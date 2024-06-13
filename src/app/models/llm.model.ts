import { Signal } from '@angular/core';

export interface LLMReport {
  progress: number;
  text: string;
  timeElapsed: number;
}

export interface LLMService {
  llmReport: Signal<LLMReport>;
}
