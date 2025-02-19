import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetListTableComponent } from './asset-list-table.component';

describe('AssetListTableComponent', () => {
  let component: AssetListTableComponent;
  let fixture: ComponentFixture<AssetListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
