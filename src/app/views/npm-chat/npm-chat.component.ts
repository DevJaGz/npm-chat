import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessagesComponent, PromptComponent } from '@components';

@Component({
  selector: 'app-npm-chat',
  standalone: true,
  imports: [PromptComponent, MessagesComponent],
  templateUrl: './npm-chat.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NpmChatComponent {}
