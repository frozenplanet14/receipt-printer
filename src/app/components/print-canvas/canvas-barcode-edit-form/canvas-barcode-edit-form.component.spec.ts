import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasBarcodeEditFormComponent } from './canvas-barcode-edit-form.component';

describe('CanvasBarcodeEditFormComponent', () => {
  let component: CanvasBarcodeEditFormComponent;
  let fixture: ComponentFixture<CanvasBarcodeEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasBarcodeEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasBarcodeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
