import { Component } from '@angular/core';
import { StorybookComponent } from 'rbhup-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StorybookComponent],
  template: `<lib-storybook></lib-storybook>`,
})
export class AppComponent { }
