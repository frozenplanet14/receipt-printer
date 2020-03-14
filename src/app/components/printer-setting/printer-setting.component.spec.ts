import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterSettingComponent } from './printer-setting.component';

describe('PrinterSettingComponent', () => {
  let component: PrinterSettingComponent;
  let fixture: ComponentFixture<PrinterSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
