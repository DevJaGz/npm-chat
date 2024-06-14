import { DatePipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  untracked,
} from '@angular/core';
import { APP_NAME } from '@constants';
import { Message } from '@models';
import { NpmChatStore } from '@store';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: './message.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  readonly #npmChatStore = inject(NpmChatStore);
  messages = this.#npmChatStore.selectMessages;
  systemMessage = this.#npmChatStore.selectSystemMessage;
  message = input.required<Message>();
  hasMessage = computed(() => Boolean(this.message().content));
  isUser = computed(() => this.message().role === 'user');
  image = computed(() => (this.isUser() ? '/thunder.webp' : '/bot.webp'));
  sender = computed(() => (this.isUser() ? 'You' : APP_NAME));
  tokens = computed(() => {
    const tokens = this.message().tokens;

    const systemMessage = this.systemMessage();
    const [firstMessage] = untracked(this.messages);
    const systemMessageTokens = systemMessage.tokens;
    const isFirstMessage = firstMessage.id === this.message().id;
    const modifyTokensInFirstMessage =
      systemMessageTokens &&
      tokens &&
      isFirstMessage &&
      systemMessageTokens < tokens;

    let realTokens = tokens;

    if (modifyTokensInFirstMessage) {
      realTokens = tokens - systemMessageTokens;
    }

    if (realTokens === 1) {
      return '1 token used';
    }

    return realTokens ? `${realTokens} tokens used` : '';
  });
  content = computed(() => this.message().content);
  time = computed(() => this.message().createdAt);
}
