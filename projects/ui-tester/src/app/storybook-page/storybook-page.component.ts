import { Component } from '@angular/core';
import { StorybookComponent } from '../../../../../dist/rbhup-ui';

@Component({
  selector: 'app-storybook-page',
  standalone: true,
  imports: [StorybookComponent],
  template: `<lib-storybook></lib-storybook>`,
})
export class StorybookPageComponent { }
