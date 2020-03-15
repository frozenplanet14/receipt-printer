import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasGraphEditFormComponent } from './canvas-graph-edit-form.component';

describe('CanvasGraphEditFormComponent', () => {
  let component: CanvasGraphEditFormComponent;
  let fixture: ComponentFixture<CanvasGraphEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasGraphEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasGraphEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
