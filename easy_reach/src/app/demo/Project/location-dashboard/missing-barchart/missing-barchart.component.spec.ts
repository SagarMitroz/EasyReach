import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingBarchartComponent } from './missing-barchart.component';

describe('MissingBarchartComponent', () => {
  let component: MissingBarchartComponent;
  let fixture: ComponentFixture<MissingBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingBarchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
