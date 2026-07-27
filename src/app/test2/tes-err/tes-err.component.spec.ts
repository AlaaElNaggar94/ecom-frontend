import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesErrComponent } from './tes-err.component';

describe('TesErrComponent', () => {
  let component: TesErrComponent;
  let fixture: ComponentFixture<TesErrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TesErrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TesErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
