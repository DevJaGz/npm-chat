import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatBrandComponent } from '@components';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [ChatBrandComponent],
  templateUrl: './brand-details.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandDetailsComponent {}
