import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbhupUi } from './rbhup-ui';

describe('RbhupUi', () => {
  let component: RbhupUi;
  let fixture: ComponentFixture<RbhupUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbhupUi],
    }).compileComponents();

    fixture = TestBed.createComponent(RbhupUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
