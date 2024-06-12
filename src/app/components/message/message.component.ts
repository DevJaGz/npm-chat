import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {

}
