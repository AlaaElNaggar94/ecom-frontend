import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COrdComponent } from './c-ord.component';

describe('COrdComponent', () => {
  let component: COrdComponent;
  let fixture: ComponentFixture<COrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [COrdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(COrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
