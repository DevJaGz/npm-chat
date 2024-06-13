import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  readonly #npmChatStore = inject(NpmChatStore);
  messages = this.#npmChatStore.selectMessages;
}
