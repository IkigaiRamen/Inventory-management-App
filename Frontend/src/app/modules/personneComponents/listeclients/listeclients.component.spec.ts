import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeclientsComponent } from './listeclients.component';

describe('ListeclientsComponent', () => {
  let component: ListeclientsComponent;
  let fixture: ComponentFixture<ListeclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeclientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
