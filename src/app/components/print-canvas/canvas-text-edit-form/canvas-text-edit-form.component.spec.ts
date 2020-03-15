import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTextEditFormComponent } from './canvas-text-edit-form.component';

describe('CanvasTextEditFormComponent', () => {
  let component: CanvasTextEditFormComponent;
  let fixture: ComponentFixture<CanvasTextEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasTextEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTextEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
