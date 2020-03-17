import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  constructor(
  ) { }

  moveInList(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
  addToList(event: CdkDragDrop<string[]>) {
    console.log('addToList', { event });
    this.cloneToList(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

  }

  /**
   * Clones item from one array to another. Modifying transferArrayItem from cdk utils found here
   * https://github.com/angular/material2/blob/master/src/cdk/drag-drop/drag-utils.ts
   * @param currentArray Array from which to transfer the item.
   * @param targetArray Array into which is put the item.
   * @param currentIndex Index of the item in its current array.
   * @param targetIndex Index at which to insert the item.
   */
  cloneToList<T = any>(
    currentArray: T[],
    targetArray: T[],
    currentIndex: number,
    targetIndex: number
  ): void {
    const to = this.clamp(targetIndex, targetArray.length);

    if (currentArray.length) {
      targetArray.splice(to, 0, currentArray[currentIndex]);
    }
  }

  /** Clamps a number between zero and a maximum. */
  clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }
}
