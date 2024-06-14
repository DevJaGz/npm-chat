import { DatePipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  untracked,
} from '@angular/core';
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
  sender = computed(() => (this.isUser() ? 'You' : 'NPM Chat'));
  tokens = computed(() => {
    const tokens = this.message().tokens;
    const systemMessage = this.systemMessage();
    const [firstMessage] = untracked(this.messages);
    const systemMessageTokens = systemMessage.tokens;
    const isFirstMessage = firstMessage.id === this.message().id;
    let realTokens = tokens;
    if (tokens && isFirstMessage && systemMessageTokens) {
      realTokens = tokens - systemMessageTokens;
    }
    return realTokens ? `${realTokens} tokens` : '...';
  });
  content = computed(() => this.message().content);
  time = computed(() => this.message().createdAt);
}
