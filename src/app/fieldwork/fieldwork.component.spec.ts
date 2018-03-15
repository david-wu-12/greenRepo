import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldworkComponent } from './fieldwork.component';

describe('FieldworkComponent', () => {
  let component: FieldworkComponent;
  let fixture: ComponentFixture<FieldworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
