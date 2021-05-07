import {Component, Input} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-template-offer',
  templateUrl: './template-offer.component.html',
  styleUrls: ['./template-offer.component.scss']
})
export class TemplateOfferComponent {

  constructor() { }

  @Input() todo: any = [];
  searchText: string;

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  noReturnPredicate(): boolean {
    return false;
  }
}
