import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'division';

  constructor() {
    this.loadTheme();
  }

  setTheme(theme: string): void {
    document.documentElement.className = theme;
    localStorage.setItem(this.themeKey, theme);
  }

  loadTheme(): void {
    const storedTheme = localStorage.getItem(this.themeKey) || 'ps';
    document.documentElement.className = storedTheme;
  }

  getActiveTheme(): string {
    return document.documentElement.className;
  }
}
