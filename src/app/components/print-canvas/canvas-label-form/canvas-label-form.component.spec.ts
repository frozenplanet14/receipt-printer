import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasLabelFormComponent } from './canvas-label-form.component';

describe('CanvasLabelFormComponent', () => {
  let component: CanvasLabelFormComponent;
  let fixture: ComponentFixture<CanvasLabelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasLabelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasLabelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
