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
  // readonly #modelId = 'Hermes-2-Pro-Llama-3-8B-q4f32_1-MLC'; // ✅ Very Delayed Download
  // readonly #modelId = 'NeuralHermes-2.5-Mistral-7B-q4f16_1-MLC'; // ✅ Very Delayed Download
  // readonly #modelId = 'WizardMath-7B-V1.1-q4f16_1-MLC'; // ❌ Very Delayed Download
  // readonly #modelId = 'gemma-2b-it-q4f16_1-MLC-1k'; // ❌  relative Delayed Download
  readonly #modelId = 'Qwen2-0.5B-Instruct-q0f16-MLC'; // ✅ relative Delayed Download
  // readonly #modelId = 'Qwen2-1.5B-Instruct-q4f16_1-MLC'; // ❌ relative Delayed Download
  // readonly #modelId = 'Phi-3-mini-4k-instruct-q4f16_1-MLC-1k'; // ❌ Delayed Download
  // readonly #modelId = 'TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC'; // ❌ Delayed Download
  // readonly #modelId = 'TinyLlama-1.1B-Chat-v1.0-q4f32_1-MLC'; // ❌ Delayed Download
  readonly #systemMessage: Message = {
    role: 'system',
    content:
      'You are a helpful assistant. The language of your responses should match the language used by the user. Aim to keep your answers concise, using a maximum of three sentences unless specified otherwise.',
  };
  readonly #progressReport = signal<LLMReport>({
    progress: 0,
    text: '',
    timeElapsed: 0,
    hasEngine: false,
  });

  #worker!: Worker;
  #engine!: WebWorkerMLCEngine;

  llmReport: Signal<LLMReport> = this.#progressReport.asReadonly();

  get hasEngine(): boolean {
    return Boolean(this.#engine);
  }

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
    this.#progressReport.update((report) => ({
      ...report,
      hasEngine: this.hasEngine,
    }));
  }

  #onNewReport(report: InitProgressReport): void {
    this.#progressReport.set({
      ...report,
      hasEngine: this.hasEngine,
    });
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
