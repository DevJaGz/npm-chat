import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { THEME_KEY } from '@constants';
import { ThemeMode } from '@models';
import { LocalStorageService } from '@services';
import { ThemeStore } from '@store';

@Component({
  selector: 'app-theme-btn',
  standalone: true,
  imports: [],
  templateUrl: './theme-btn.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeBtnComponent {
  readonly #themeStore = inject(ThemeStore);
  readonly #localStorage = inject(LocalStorageService);
  readonly #document = inject(DOCUMENT);
  isDarkTheme = this.#themeStore.isDarkTheme;

  constructor() {
    const storedTheme = this.#localStorage.getItem<ThemeMode>(THEME_KEY);
    if (storedTheme) {
      this.#setTheme(storedTheme);
    }
    effect(() => {
      const currentTheme = this.#themeStore.selectTheme();
      this.#setTheme(currentTheme);
      this.#storeTheme(currentTheme);
    });
  }

  toggleTheme(): void {
    this.#themeStore.toggleTheme();
  }

  #setTheme(themeMode: string): void {
    this.#document.documentElement.setAttribute('data-theme', themeMode);
  }

  #storeTheme(themeMode: string): void {
    this.#localStorage.setItem(THEME_KEY, themeMode);
  }
}
