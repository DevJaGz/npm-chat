import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TemplateComponent } from '../template/template.component';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [TemplateComponent],
  templateUrl: './templates.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesComponent {}
