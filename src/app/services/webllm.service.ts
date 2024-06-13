import { Injectable, Signal, signal } from '@angular/core';
import {
  InitProgressReport,
  CreateWebWorkerMLCEngine,
  WebWorkerMLCEngine,
} from '@mlc-ai/web-llm';
import { LLMReport, LLMService } from '../models/llm.model';

@Injectable({
  providedIn: 'root',
})
export class WebllmService implements LLMService {
  readonly #modelId = 'TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC-1k';
  readonly #progressReport = signal<InitProgressReport>({
    progress: 0,
    text: '',
    timeElapsed: 0,
  });

  worker!: Worker;
  engine!: WebWorkerMLCEngine;
  llmReport: Signal<LLMReport> = this.#progressReport.asReadonly();

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

    this.worker = worker;
    this.engine = engine;
  }

  #onNewReport(report: InitProgressReport): void {
    this.#progressReport.set(report);
  }
}
