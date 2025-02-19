import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BleListComponent } from './ble-list.component';

describe('BleListComponent', () => {
  let component: BleListComponent;
  let fixture: ComponentFixture<BleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
