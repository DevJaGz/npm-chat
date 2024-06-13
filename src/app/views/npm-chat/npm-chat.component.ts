import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MessagesComponent, PromptComponent } from '@components';
import { WebllmService } from '@services';
import { NpmChatStore } from '@store';

@Component({
  selector: 'app-npm-chat',
  standalone: true,
  imports: [PromptComponent, MessagesComponent],
  providers: [NpmChatStore],
  templateUrl: './npm-chat.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NpmChatComponent {
  readonly #webllm = inject(WebllmService);
  readonly #store = inject(NpmChatStore);

  constructor() {
    effect(
      () => {
        const report = this.#webllm.progressReport();
        this.#store.setLlmReport(report);
      },
      {
        allowSignalWrites: true,
      }
    );
  }
}
