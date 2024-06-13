import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NpmChatStore } from '@store';

@Component({
  selector: 'app-llm-progress',
  standalone: true,
  imports: [],
  templateUrl: './llm-progress.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmProgressComponent {
  readonly #npmChatStore = inject(NpmChatStore);
  llmReport = this.#npmChatStore.selectLlmReport;
}
