import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CErrComponent } from './c-err.component';

describe('CErrComponent', () => {
  let component: CErrComponent;
  let fixture: ComponentFixture<CErrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CErrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
