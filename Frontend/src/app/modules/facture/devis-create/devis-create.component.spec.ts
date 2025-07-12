import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisCreateComponent } from './devis-create.component';

describe('DevisCreateComponent', () => {
  let component: DevisCreateComponent;
  let fixture: ComponentFixture<DevisCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
