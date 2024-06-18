import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Template } from '@models';
import { NpmChatStore } from '@store';
import { RenderSvgDirective } from '@directives';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [RenderSvgDirective],
  templateUrl: './template.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateComponent {
  readonly #npmChatStore = inject(NpmChatStore);
  template = input.required<Template>();

  loadTemplate() {
    this.#npmChatStore.newUserMessage(this.template().prompt);
  }
}
