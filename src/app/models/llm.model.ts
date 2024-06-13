import { Signal } from '@angular/core';
import { Messages } from './chat.model';
import { Observable } from 'rxjs';

export interface LLMReport {
  progress: number;
  text: string;
  timeElapsed: number;
}

export interface LLMService {
  llmReport: Signal<LLMReport>;
  getChatReply(messages: Messages): Observable<LLMReply>;
}

export interface LLMReply {
  usage?: CompletionUsage;
  content: string;
}

export interface CompletionUsage {
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;
}
