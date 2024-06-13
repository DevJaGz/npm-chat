import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  computed,
  effect,
  inject,
  untracked,
  viewChild,
} from '@angular/core';
import { NpmChatStore } from '@store';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageComponent],
  templateUrl: './messages.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  readonly #renderer = inject(Renderer2);
  readonly #npmChatStore = inject(NpmChatStore);
  messages = this.#npmChatStore.selectMessages;
  messageCount = this.#npmChatStore.selectMessageCount;
  messagesCount = 0;
  scrollContainerRef =
    viewChild<ElementRef<HTMLDivElement>>('scrollContainerRef');
  scrollContainer = computed(() => this.scrollContainerRef()?.nativeElement);

  constructor() {
    effect(() => {
      const messageCount = this.messageCount();
      const scrollContainer = untracked(this.scrollContainer);
      if (messageCount > 0 && scrollContainer) {
        this.#scrollToBottomNextTick(scrollContainer);
      }
    });
  }

  #scrollToBottomNextTick(scrollContainer: HTMLDivElement) {
    setTimeout(() => {
      const scrollHeight = scrollContainer.scrollHeight;
      this.#renderer.setProperty(scrollContainer, 'scrollTop', scrollHeight);
    }, 0);
  }
}
