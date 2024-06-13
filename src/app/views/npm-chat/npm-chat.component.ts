import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessagesComponent, PromptComponent } from '@components';
import { WebllmService } from '@services';

@Component({
  selector: 'app-npm-chat',
  standalone: true,
  imports: [PromptComponent, MessagesComponent],
  templateUrl: './npm-chat.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NpmChatComponent {
  readonly #webllm = inject(WebllmService);
}
