import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {
  themes = ['ps', 'xms', 'frs', 'fcs'];
  activeTheme?: string;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.activeTheme = this.themeService.getActiveTheme();
  }

  changeTheme(theme: string): void {
    this.themeService.setTheme(theme);
    this.activeTheme = theme;
  }
}
