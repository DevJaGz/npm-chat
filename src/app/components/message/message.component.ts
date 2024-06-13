import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Message } from '@models';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './message.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  message = input.required<Message>();
  hasMessage = computed(() => Boolean(this.message().content));
  isUser = computed(() => this.message().role === 'user');
  image = computed(() => (this.isUser() ? '/thunder.webp' : '/bot.webp'));
  sender = computed(() => (this.isUser() ? 'You' : 'NPM Chat'));
}
