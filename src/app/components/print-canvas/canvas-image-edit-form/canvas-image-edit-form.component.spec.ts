import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasImageEditFormComponent } from './canvas-image-edit-form.component';

describe('CanvasImageEditFormComponent', () => {
  let component: CanvasImageEditFormComponent;
  let fixture: ComponentFixture<CanvasImageEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasImageEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasImageEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
