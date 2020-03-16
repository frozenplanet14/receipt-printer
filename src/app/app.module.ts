import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { FlexLayoutModule } from '@angular/flex-layout';

import { NgJsonEditorModule } from 'ang-jsoneditor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';


import { PrinterSettingComponent } from './components/printer-setting/printer-setting.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PrintPageComponent } from './components/print-page/print-page.component';
import { PrintCanvasComponent } from './components/print-canvas/print-canvas.component';
import { CanvasSettingFormComponent } from './components/print-canvas/canvas-setting-form/canvas-setting-form.component';
import { CanvasImageEditFormComponent } from './components/print-canvas/canvas-image-edit-form/canvas-image-edit-form.component';
import { MenuListComponent } from './nav/menu-list/menu-list.component';
import { PageHeaderComponent } from './nav/page-header/page-header.component';
import { CanvasTextEditFormComponent } from './components/print-canvas/canvas-text-edit-form/canvas-text-edit-form.component';
import { CanvasBarcodeEditFormComponent } from './components/print-canvas/canvas-barcode-edit-form/canvas-barcode-edit-form.component';
import { CanvasGraphEditFormComponent } from './components/print-canvas/canvas-graph-edit-form/canvas-graph-edit-form.component';
import { CanvasHandDrawingFormComponent } from './components/print-canvas/canvas-hand-drawing-form/canvas-hand-drawing-form.component';
import { CanvasLabelFormComponent } from './components/print-canvas/canvas-label-form/canvas-label-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PrinterSettingComponent,
    DialogComponent,
    PrintPageComponent,
    PrintCanvasComponent,
    CanvasSettingFormComponent,
    CanvasImageEditFormComponent,
    MenuListComponent,
    PageHeaderComponent,
    CanvasTextEditFormComponent,
    CanvasBarcodeEditFormComponent,
    CanvasGraphEditFormComponent,
    CanvasHandDrawingFormComponent,
    CanvasLabelFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    FlexLayoutModule,
    NgJsonEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
