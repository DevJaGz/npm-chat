import {
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebllmService } from '@services';
import { NpmChatStore } from '@store';
import { Message } from '../../models/chat.model';
import { CompletionUsage } from '@models';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prompt.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptComponent {
  readonly #webllmService = inject(WebllmService);
  readonly #npmChatStore = inject(NpmChatStore);
  readonly #renderer = inject(Renderer2);

  message = signal('');
  hasMessage = computed(() => this.message() !== '');
  isLlmLoaded = this.#npmChatStore.isLlmLoaded;
  isLlmBusy = this.#npmChatStore.selectIsBusy;

  onMessageChange($textarea: HTMLTextAreaElement, value: string): void {
    this.message.set(value);
    this.#renderer.setStyle($textarea, 'height', 'auto');
    const textAreaHeight = $textarea.scrollHeight;
    this.#renderer.setStyle($textarea, 'height', `${textAreaHeight}px`);
  }

  submitMessage(event: Event): void {
    event.preventDefault();
    this.#addUserMessage();
    this.message.set('');
    this.#handleChatReply();
  }

  #addUserMessage(): void {
    const message = this.message();
    this.#npmChatStore.addMessage({
      role: 'user',
      content: message,
      createdAt: Date.now(),
      tokens: null,
    });
  }

  #handleChatReply(): void {
    const currentMessages = this.#npmChatStore.selectMessages();
    const assistantMessage = this.#npmChatStore.addMessage({
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
      tokens: null,
    });

    this.#npmChatStore.setIsBusy(true);
    this.#webllmService.getChatReply(currentMessages).subscribe({
      next: (llmReply) => {
        const usage = llmReply.usage;
        const newMessage: Message = {
          ...assistantMessage,
          content: llmReply.content,
        };
        this.#npmChatStore.setMessage(newMessage);
        if (usage) {
          this.#updateMessageTokens(usage);
          this.#npmChatStore.setIsBusy(false);
        }
      },
    });
  }

  #updateMessageTokens(usage: CompletionUsage): void {
    const messages = this.#npmChatStore.selectMessages();
    const [secondLastMessage, lastMessage] = messages.slice(-2);
    const lastMessageTokens = usage.completionTokens;
    const secondLastMessageTokens = usage.promptTokens;

    this.#npmChatStore.setMessage({
      ...lastMessage,
      tokens: lastMessageTokens,
    });

    this.#npmChatStore.setMessage({
      ...secondLastMessage,
      tokens: secondLastMessageTokens,
    });
  }
}
