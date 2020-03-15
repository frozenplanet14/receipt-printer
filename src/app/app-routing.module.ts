import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterSettingComponent } from './components/printer-setting/printer-setting.component';
import { PrintPageComponent } from './components/print-page/print-page.component';
import { PrintCanvasComponent } from './components/print-canvas/print-canvas.component';
import { CanvasImageEditFormComponent } from './components/print-canvas/canvas-image-edit-form/canvas-image-edit-form.component';
import { CanvasTextEditFormComponent } from './components/print-canvas/canvas-text-edit-form/canvas-text-edit-form.component';


const routes: Routes = [
  { path: 'setting', component: PrinterSettingComponent },
  { path: 'printOptions', component: PrintPageComponent },
  {
    path: 'canvas', component: PrintCanvasComponent, children: [
      { path: 'image', component: CanvasImageEditFormComponent, data: { id: 'image' } },
      { path: 'text', component: CanvasTextEditFormComponent, data: { id: 'text' } }
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
