import { Injectable, Signal, signal } from '@angular/core';
import {
  InitProgressReport,
  CreateWebWorkerMLCEngine,
  WebWorkerMLCEngine,
} from '@mlc-ai/web-llm';
import { LLMReply, LLMReport, LLMService, Message, Messages } from '@models';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebllmService implements LLMService {
  readonly #modelId = 'TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC-1k';
  readonly #systemMessage: Message = {
    role: 'system',
    content:
      'You are a helpful assistant. The language of your responses should match the language used by the user. Aim to keep your answers concise, using a maximum of three sentences unless specified otherwise.',
  };
  readonly #progressReport = signal<InitProgressReport>({
    progress: 0,
    text: '',
    timeElapsed: 0,
  });

  #worker!: Worker;
  #engine!: WebWorkerMLCEngine;

  llmReport: Signal<LLMReport> = this.#progressReport.asReadonly();

  getChatReply(messages: Messages): Observable<LLMReply> {
    const newMessages = [this.#systemMessage, ...messages];
    const llmReply = new Subject<LLMReply>();
    this.#chatCompletionReplay(newMessages, llmReply);
    return llmReply.asObservable();
  }

  constructor() {
    this.#initialize();
  }

  async #initialize() {
    const worker = new Worker(
      new URL('./workers/webllm.worker', import.meta.url),
      { type: 'module' }
    );

    const engine = await CreateWebWorkerMLCEngine(worker, this.#modelId, {
      initProgressCallback: this.#onNewReport.bind(this),
    });

    this.#worker = worker;
    this.#engine = engine;
  }

  #onNewReport(report: InitProgressReport): void {
    this.#progressReport.set(report);
  }

  async #chatCompletionReplay(messages: Messages, llmReply: Subject<LLMReply>) {
    try {
      const chunks = await this.#engine.chat.completions.create({
        messages,
        temperature: 0.5,
        stream: true,
        stream_options: { include_usage: true },
      });

      let reply = '';

      for await (const chunk of chunks) {
        reply += chunk.choices[0]?.delta.content || '';
        llmReply.next({ content: reply });
        const usage = chunk.usage;
        if (usage) {
          llmReply.next({
            content: reply,
            usage: {
              completionTokens: usage.completion_tokens,
              promptTokens: usage.prompt_tokens,
              totalTokens: usage.total_tokens,
            },
          });
          llmReply.complete();
        }
      }
    } catch (error) {
      llmReply.complete();
      throw error;
    }
  }
}
