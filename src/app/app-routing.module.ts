import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterSettingComponent } from './components/printer-setting/printer-setting.component';
import { PrintPageComponent } from './components/print-page/print-page.component';
import { PrintCanvasComponent } from './components/print-canvas/print-canvas.component';


const routes: Routes = [
  { path: 'setting', component: PrinterSettingComponent },
  { path: 'printOptions', component: PrintPageComponent },
  { path: 'canvasPrint', component: PrintCanvasComponent },
  { path: '', redirectTo: '/setting', pathMatch: 'full' },
  { path: '**', component: PrinterSettingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
