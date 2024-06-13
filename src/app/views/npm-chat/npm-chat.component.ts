import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  untracked,
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
  // readonly #webllmService = inject(WebllmService);
  // readonly #npmChatStore = inject(NpmChatStore);
  // constructor() {
  //   effect(() => {
  //     const llmReport = this.#webllmService.llmReport();
  //     untracked(() => {
  //       this.#npmChatStore.setLlmReport(llmReport);
  //     });
  //   });
  // }
}
