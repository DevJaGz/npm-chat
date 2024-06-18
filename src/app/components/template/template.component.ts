import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [],
  templateUrl: './template.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent {

}
