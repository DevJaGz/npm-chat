import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ChatBrandComponent,
  LlmProgressComponent,
  MessagesComponent,
  PromptComponent,
  TemplatesComponent,
  ThemeBtnComponent,
  RepoBtnComponent,
  NewChatBtnComponent,
} from '@components';
import { WebllmService } from '@services';
import { NpmChatStore } from '@store';
import { APP_NAME } from '@constants';

@Component({
  selector: 'app-npm-chat',
  standalone: true,
  imports: [
    PromptComponent,
    MessagesComponent,
    LlmProgressComponent,
    TemplatesComponent,
    ChatBrandComponent,
    ThemeBtnComponent,
    RepoBtnComponent,
    NewChatBtnComponent,
  ],
  providers: [NpmChatStore],
  templateUrl: './npm-chat.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NpmChatComponent {
  readonly #webllmService = inject(WebllmService);
  readonly #npmChatStore = inject(NpmChatStore);
  readonly #systemMessage = this.#npmChatStore.selectSystemMessage;
  readonly #title = inject(Title);

  hasMessages = this.#npmChatStore.hasMessages;
  isLlmLoaded = this.#npmChatStore.isLlmLoaded;

  constructor() {
    this.#title.setTitle(APP_NAME);
    this.#webllmService.initialize(this.#systemMessage());
  }
}
