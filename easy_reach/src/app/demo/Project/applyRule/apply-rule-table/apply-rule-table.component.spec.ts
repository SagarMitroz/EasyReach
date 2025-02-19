import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyRuleTableComponent } from './apply-rule-table.component';

describe('ApplyRuleTableComponent', () => {
  let component: ApplyRuleTableComponent;
  let fixture: ComponentFixture<ApplyRuleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyRuleTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyRuleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
