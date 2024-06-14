import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  untracked,
} from '@angular/core';
import {
  LlmProgressComponent,
  MessagesComponent,
  PromptComponent,
} from '@components';
import { WebllmService } from '@services';
import { NpmChatStore } from '@store';

@Component({
  selector: 'app-npm-chat',
  standalone: true,
  imports: [PromptComponent, MessagesComponent, LlmProgressComponent],
  providers: [NpmChatStore],
  templateUrl: './npm-chat.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NpmChatComponent {
  readonly #webllmService = inject(WebllmService);
  readonly #npmChatStore = inject(NpmChatStore);
  readonly #systemMessage = this.#npmChatStore.selectSystemMessage;

  isLlmLoaded = this.#npmChatStore.isLlmLoaded;

  constructor() {
    this.#webllmService.initialize(this.#systemMessage());
    effect(() => {
      const llmReport = this.#webllmService.llmReport();
      untracked(() => {
        this.#npmChatStore.setLlmReport(llmReport);
      });
    });
  }
}
