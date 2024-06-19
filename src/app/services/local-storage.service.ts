import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem<T = string>(key: string, parse?: boolean): T | null {
    const value = localStorage.getItem(key);
    if (value) {
      return parse ? JSON.parse(value) : value;
    }
    return null;
  }

  setItem(key: string, value: string | object): void {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
