import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tes3Component } from './tes3.component';

describe('Tes3Component', () => {
  let component: Tes3Component;
  let fixture: ComponentFixture<Tes3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tes3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Tes3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
