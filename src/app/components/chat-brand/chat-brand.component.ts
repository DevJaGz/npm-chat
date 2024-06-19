import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-chat-brand',
  standalone: true,
  imports: [],
  templateUrl: './chat-brand.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBrandComponent {
  horizontal = input<boolean>(false);
  asTitle = input<boolean>(true);
}
