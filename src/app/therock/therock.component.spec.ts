import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherockComponent } from './therock.component';

describe('TherockComponent', () => {
  let component: TherockComponent;
  let fixture: ComponentFixture<TherockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
