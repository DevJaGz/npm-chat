import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  inject,
} from '@angular/core';
import {
  DAISY_IU_THEME_DATA_KEY,
  TAILWIND_DARK_THEME_CLASS,
  THEME_KEY,
} from '@constants';
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
export class ThemeBtnComponent implements AfterViewInit {
  readonly #themeStore = inject(ThemeStore);
  readonly #localStorage = inject(LocalStorageService);
  readonly #renderer = inject(Renderer2);
  readonly #document = inject(DOCUMENT);
  currentTheme = this.#themeStore.selectTheme;
  isDarkTheme = this.#themeStore.isDarkTheme;

  ngAfterViewInit(): void {
    const storedTheme = this.#localStorage.getItem<ThemeMode>(THEME_KEY);
    if (storedTheme) {
      this.#setTheme(storedTheme);
      this.#renderTheme(storedTheme);
      return;
    }
    const currentTheme = this.currentTheme();
    this.#saveTheme(currentTheme);
    this.#renderTheme(currentTheme);
  }

  toggleTheme(): void {
    this.#themeStore.toggleTheme();
    const currentTheme = this.currentTheme();
    this.#renderTheme(currentTheme);
    this.#saveTheme(currentTheme);
  }

  #setTheme(themeMode: ThemeMode): void {
    this.#themeStore.setTheme(themeMode);
  }

  #renderTheme(themeMode: ThemeMode): void {
    this.#renderer.setAttribute(
      this.#document.documentElement,
      DAISY_IU_THEME_DATA_KEY,
      themeMode
    );
    const isDarkTheme = this.isDarkTheme();
    if (isDarkTheme) {
      this.#renderer.addClass(
        this.#document.documentElement,
        TAILWIND_DARK_THEME_CLASS
      );
      return;
    }
    this.#renderer.removeClass(
      this.#document.documentElement,
      TAILWIND_DARK_THEME_CLASS
    );
  }

  #saveTheme(themeMode: ThemeMode): void {
    this.#localStorage.setItem(THEME_KEY, themeMode);
  }
}
