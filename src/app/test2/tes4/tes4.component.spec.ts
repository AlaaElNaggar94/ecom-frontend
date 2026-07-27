import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tes4Component } from './tes4.component';

describe('Tes4Component', () => {
  let component: Tes4Component;
  let fixture: ComponentFixture<Tes4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tes4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Tes4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
