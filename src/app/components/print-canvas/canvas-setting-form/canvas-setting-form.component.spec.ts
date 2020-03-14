import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSettingFormComponent } from './canvas-setting-form.component';

describe('CanvasSettingFormComponent', () => {
  let component: CanvasSettingFormComponent;
  let fixture: ComponentFixture<CanvasSettingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasSettingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
