import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tes8Component } from './tes8.component';

describe('Tes8Component', () => {
  let component: Tes8Component;
  let fixture: ComponentFixture<Tes8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tes8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Tes8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
