import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocreqComponent } from './docreq.component';

describe('DocreqComponent', () => {
  let component: DocreqComponent;
  let fixture: ComponentFixture<DocreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
