import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualListComponent } from './dual-list.component';

describe('DualListComponent', () => {
  let component: DualListComponent;
  let fixture: ComponentFixture<DualListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DualListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
