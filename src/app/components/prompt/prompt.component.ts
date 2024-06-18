import {
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NpmChatStore } from '@store';
import { APP_NAME } from '@constants';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prompt.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptComponent {
  readonly #npmChatStore = inject(NpmChatStore);
  readonly #renderer = inject(Renderer2);

  message = signal('');
  hasMessage = computed(() => this.message() !== '');
  isLlmLoaded = this.#npmChatStore.isLlmLoaded;
  isLlmBusy = this.#npmChatStore.selectIsBusy;
  promptPLaceholder = `Message ${APP_NAME}`;

  onMessageChange($textarea: HTMLTextAreaElement, value: string): void {
    this.message.set(value);
    this.#renderer.setStyle($textarea, 'height', 'auto');
    const textAreaHeight = $textarea.scrollHeight;
    this.#renderer.setStyle($textarea, 'height', `${textAreaHeight}px`);
  }

  submitMessage(event: Event): void {
    event.preventDefault();
    this.#npmChatStore.newUserMessage(this.message());
    this.message.set('');
  }
}
