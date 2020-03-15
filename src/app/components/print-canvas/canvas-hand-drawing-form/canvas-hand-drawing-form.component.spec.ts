import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasHandDrawingFormComponent } from './canvas-hand-drawing-form.component';

describe('CanvasHandDrawingFormComponent', () => {
  let component: CanvasHandDrawingFormComponent;
  let fixture: ComponentFixture<CanvasHandDrawingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasHandDrawingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasHandDrawingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
