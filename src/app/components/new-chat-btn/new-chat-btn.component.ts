import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NpmChatStore } from '@store';

@Component({
  selector: 'app-new-chat-btn',
  standalone: true,
  imports: [],
  templateUrl: './new-chat-btn.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChatBtnComponent {
  readonly #npmChatStore = inject(NpmChatStore);
  isLlmBusy = this.#npmChatStore.selectIsBusy;

  clearChat(): void {
    this.#npmChatStore.clearMessages();
  }
}
