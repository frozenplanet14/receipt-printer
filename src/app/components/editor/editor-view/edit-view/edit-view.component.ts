import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { EDIT_MENU_FORM } from './constant/edit-menu-form.const';
import { MatDialog } from '@angular/material/dialog';
import { ImportDataComponent } from '../import-data/import-data.component';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FORM_TYPE_CONST } from './constant/form-type.const';
import { getDefault } from 'src/app/components/print-canvas/canvas-setting-form/canvas-setting.model';
import { DocumentService } from '../../services/document.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditMenuModel, ItemModel } from '../../model/form-model';

@Component({
  selector: 'epson-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit, OnDestroy {
  force: boolean;
  formTypes = FORM_TYPE_CONST;
  // Edit menu items left panel
  menuList: EditMenuModel[] = EDIT_MENU_FORM;
  // canvas items
  canvasItems: ItemModel[] = [];
  // Form elements
  group: FormGroup;
  get items(): FormArray {
    return this.group.get('items') as FormArray;
  }
  // unsubscribe event
  unsubscribe = new Subject<any>();

  constructor(
    private dialog: MatDialog,
    private docService: DocumentService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.group = this.fb.group({
      items: this.fb.array([])
    });
    console.log(this.menuList);
  }

  addItem(items: any[]): void {
    if (!(items || []).length) {
      return;
    }
    const obj = [...items].reduce((cumm, curr) => {
      if (curr.type === FORM_TYPE_CONST.FORM_TYPE_SELECT && !curr.value) {
        curr.value = (getDefault(curr.options) || {}).value;
      }
      return { ...cumm, [curr.id]: new FormControl(curr.value) };
    }, {});
    this.items.push(new FormGroup(obj));
  }

  // https://github.com/angular/angular/issues/27171
  moveControl(prevIndex: number, currIndex: number) {
    const dir = currIndex > prevIndex ? 1 : -1;

    const temp = this.items.at(prevIndex);
    for (let i = prevIndex; i * dir < currIndex * dir; i = i + dir) {
      const current = this.items.at(i + dir);
      this.items.setControl(i, current);
    }
    this.items.setControl(currIndex, temp);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      const { previousIndex, currentIndex } = event;
      this.moveControl(previousIndex, currentIndex);
      moveItemInArray(event.container.data, previousIndex, currentIndex);
    } else {
      // console.log(event);
      this.addItem(event.item.data.form);
      // tslint:disable-next-line: no-string-literal
      // const index = event.previousContainer.data.findIndex(x => x['name'] === event.item.data.name);
      copyArrayItem([event.item.data], event.container.data, 0, event.currentIndex);
    }
    this.docService.data.next(this.canvasItems);
  }

  onImport() {
    const dialogRef = this.dialog.open(ImportDataComponent, {
      height: '600px',
      width: '600px',
    });

    this.docService.data.pipe(takeUntil(this.unsubscribe)).subscribe(
      (data) => {
        console.log(data);
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.unsubscribe.next();
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy() {
    // unsubscribe if subscription is pending
    this.unsubscribe.next();
  }

}
