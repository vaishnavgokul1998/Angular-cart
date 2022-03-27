import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTipComponent } from './error-tip.component';

describe('ErrorTipComponent', () => {
  let component: ErrorTipComponent;
  let fixture: ComponentFixture<ErrorTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
