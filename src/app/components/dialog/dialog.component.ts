import { Component, Inject } from '@angular/core';
import { DialogDataModel } from 'src/app/models/dialog-data.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'epson-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
