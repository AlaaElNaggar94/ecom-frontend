import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRegComponent } from './c-reg.component';

describe('CRegComponent', () => {
  let component: CRegComponent;
  let fixture: ComponentFixture<CRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
