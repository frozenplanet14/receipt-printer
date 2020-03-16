import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterSettingComponent } from './components/printer-setting/printer-setting.component';
import { PrintPageComponent } from './components/print-page/print-page.component';
import { PrintCanvasComponent } from './components/print-canvas/print-canvas.component';
import { CanvasImageEditFormComponent } from './components/print-canvas/canvas-image-edit-form/canvas-image-edit-form.component';
import { CanvasTextEditFormComponent } from './components/print-canvas/canvas-text-edit-form/canvas-text-edit-form.component';
import { CanvasBarcodeEditFormComponent } from './components/print-canvas/canvas-barcode-edit-form/canvas-barcode-edit-form.component';
import { CanvasGraphEditFormComponent } from './components/print-canvas/canvas-graph-edit-form/canvas-graph-edit-form.component';
import { CanvasHandDrawingFormComponent } from './components/print-canvas/canvas-hand-drawing-form/canvas-hand-drawing-form.component';
import { CanvasLabelFormComponent } from './components/print-canvas/canvas-label-form/canvas-label-form.component';


const routes: Routes = [
  { path: 'setting', component: PrinterSettingComponent },
  { path: 'printOptions', component: PrintPageComponent },
  {
    path: 'canvas', component: PrintCanvasComponent, children: [
      { path: 'image', component: CanvasImageEditFormComponent },
      { path: 'text', component: CanvasTextEditFormComponent },
      { path: 'barcode', component: CanvasBarcodeEditFormComponent },
      { path: 'graph', component: CanvasGraphEditFormComponent },
      { path: 'handwriting', component: CanvasHandDrawingFormComponent },
      { path: 'label', component: CanvasLabelFormComponent }
    ]
  },
  { path: '', redirectTo: '/setting', pathMatch: 'full' },
  { path: '**', component: PrinterSettingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
