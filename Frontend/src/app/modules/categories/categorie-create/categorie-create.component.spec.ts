import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieCreateComponent } from './categorie-create.component';

describe('CategorieCreateComponent', () => {
  let component: CategorieCreateComponent;
  let fixture: ComponentFixture<CategorieCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorieCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
