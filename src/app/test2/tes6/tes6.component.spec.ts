import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tes6Component } from './tes6.component';

describe('Tes6Component', () => {
  let component: Tes6Component;
  let fixture: ComponentFixture<Tes6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tes6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Tes6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
