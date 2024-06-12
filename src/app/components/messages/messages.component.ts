import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {

}
