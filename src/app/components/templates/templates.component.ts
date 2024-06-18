import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { Templates } from '@models';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [TemplateComponent],
  templateUrl: './templates.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesComponent {
  templates: Templates = [
    {
      prompt:
        "Recommend a vacation destination for someone who loves hiking and nature. Include reasons why it's a great choice",
      label: 'Travel Recommendation',
      icon: '🇫🇷',
    },
    {
      prompt:
        'Suggest a simple dinner recipe for someone who is a beginner in cooking. Include basic ingredients and steps as lists',
      label: 'Recipe Suggestion',
      icon: '🇫🇷',
    },
    {
      prompt:
        'Explain blockchain to high school students using simple terms and analogies',
      label: 'Technical Explanation',
      icon: '🇫🇷',
    },
  ];
}
