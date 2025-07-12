import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierViewComponent } from './panier-view.component';

describe('PanierViewComponent', () => {
  let component: PanierViewComponent;
  let fixture: ComponentFixture<PanierViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanierViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanierViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
