import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Template } from '@models';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [],
  templateUrl: './template.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateComponent {
  template = input.required<Template>();
}
