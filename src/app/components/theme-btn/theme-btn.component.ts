import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  inject,
} from '@angular/core';
import { DAISY_IU_THEME_DATA_KEY, THEME_KEY } from '@constants';
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
  isDarkTheme = this.#themeStore.isDarkTheme;

  ngAfterViewInit(): void {
    const storedTheme = this.#localStorage.getItem<ThemeMode>(THEME_KEY);
    if (storedTheme) {
      this.#setTheme(storedTheme);
      this.#renderTheme(storedTheme);
    }
  }

  toggleTheme(): void {
    this.#themeStore.toggleTheme();
    const currentTheme = this.#themeStore.selectTheme();
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
  }

  #saveTheme(themeMode: ThemeMode): void {
    this.#localStorage.setItem(THEME_KEY, themeMode);
  }
}
