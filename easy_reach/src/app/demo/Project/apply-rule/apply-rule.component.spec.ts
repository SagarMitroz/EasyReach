import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyRuleComponent } from './apply-rule.component';

describe('ApplyRuleComponent', () => {
  let component: ApplyRuleComponent;
  let fixture: ComponentFixture<ApplyRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
