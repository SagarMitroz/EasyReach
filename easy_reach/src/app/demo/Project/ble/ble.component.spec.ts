import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BleComponent } from './ble.component';

describe('BleComponent', () => {
  let component: BleComponent;
  let fixture: ComponentFixture<BleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
