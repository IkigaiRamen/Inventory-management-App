import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListefournisseursComponent } from './listefournisseurs.component';

describe('ListefournisseursComponent', () => {
  let component: ListefournisseursComponent;
  let fixture: ComponentFixture<ListefournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListefournisseursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListefournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
