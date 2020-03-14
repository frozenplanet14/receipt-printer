import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCanvasComponent } from './print-canvas.component';

describe('PrintCanvasComponent', () => {
  let component: PrintCanvasComponent;
  let fixture: ComponentFixture<PrintCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
