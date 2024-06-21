import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDetailsComponent } from './brand-details.component';

describe('BrandDetailsComponent', () => {
  let component: BrandDetailsComponent;
  let fixture: ComponentFixture<BrandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
