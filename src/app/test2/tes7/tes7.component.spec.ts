import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tes7Component } from './tes7.component';

describe('Tes7Component', () => {
  let component: Tes7Component;
  let fixture: ComponentFixture<Tes7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tes7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Tes7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
