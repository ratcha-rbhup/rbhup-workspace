import { Component } from '@angular/core';
import { ButtonComponent } from 'rbhup-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="padding: 20px;">
      <rb-button>Submit</rb-button>
    </div>
  `,
})
export class AppComponent {}
