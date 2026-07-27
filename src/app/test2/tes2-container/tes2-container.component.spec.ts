import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tes2ContainerComponent } from './tes2-container.component';

describe('Tes2ContainerComponent', () => {
  let component: Tes2ContainerComponent;
  let fixture: ComponentFixture<Tes2ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tes2ContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Tes2ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
