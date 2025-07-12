  import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsListComponent } from './produits-list.component';

describe('ProduitsListComponent', () => {
  let component: ProduitsListComponent;
  let fixture: ComponentFixture<ProduitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduitsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
