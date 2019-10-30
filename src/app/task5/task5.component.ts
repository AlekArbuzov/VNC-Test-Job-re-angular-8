import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-task5',
  templateUrl: './task5.component.html',
})
export class Task5Component implements OnInit {
  themes = [
    'light',
    'dark',
    'blue',
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  ngOnInit(): void {
    this.changeTheme('light');
  }

  onThemeChange($event: Event) {
    this.changeTheme(($event.target as HTMLInputElement).value);
  }

  changeTheme(themeName: string) {
    const head = this.document.querySelector('head');
    const href = `${themeName}.css`;
    const themeLink = this.document.querySelector('site-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = href;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = href;

      head.appendChild(style);
    }
  }

}
