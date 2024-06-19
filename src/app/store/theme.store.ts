import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { ThemeMode } from '@models';

export interface ThemeState {
  theme: WritableSignal<ThemeMode>;
}

export const InitialThemeState: ThemeState = {
  theme: signal<ThemeMode>('business'),
};

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  readonly #state = InitialThemeState;

  readonly selectTheme = this.#state.theme.asReadonly();
  readonly isDarkTheme = computed(() => this.selectTheme() === 'business');

  toggleTheme(): void {
    const state = this.#state.theme;
    state.update((currentTheme) => {
      return currentTheme === 'business' ? 'emerald' : 'business';
    });
  }

  setTheme(value: ThemeMode): void {
    const state = this.#state.theme;
    state.set(value);
  }
}
