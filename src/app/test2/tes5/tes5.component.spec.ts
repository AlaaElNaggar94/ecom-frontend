import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tes5Component } from './tes5.component';

describe('Tes5Component', () => {
  let component: Tes5Component;
  let fixture: ComponentFixture<Tes5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tes5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Tes5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
