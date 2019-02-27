import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContenteComponent } from './modal-content.component';

describe('ModalContenteComponent', () => {
  let component: ModalContenteComponent;
  let fixture: ComponentFixture<ModalContenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalContenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
