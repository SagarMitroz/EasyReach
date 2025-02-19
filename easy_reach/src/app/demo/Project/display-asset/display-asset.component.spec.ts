import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAssetComponent } from './display-asset.component';

describe('DisplayAssetComponent', () => {
  let component: DisplayAssetComponent;
  let fixture: ComponentFixture<DisplayAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAssetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
