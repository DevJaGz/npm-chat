import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appRenderSvg]',
  standalone: true,
})
export class RenderSvgDirective implements AfterViewInit {
  readonly #render = inject(Renderer2);
  readonly #hostRef = inject(ElementRef<HTMLElement>);
  readonly #domParser = new DOMParser();

  appRenderSvg = input.required<string | undefined>();

  ngAfterViewInit(): void {
    this.#renderSvg();
  }

  #renderSvg(): void {
    const svg = this.appRenderSvg();
    if (!svg) {
      return;
    }
    const svgElement = this.#domParser.parseFromString(svg, 'image/svg+xml');
    this.#render.appendChild(
      this.#hostRef.nativeElement,
      svgElement.documentElement
    );
  }
}
