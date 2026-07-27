import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLogComponent } from './c-log.component';

describe('CLogComponent', () => {
  let component: CLogComponent;
  let fixture: ComponentFixture<CLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
