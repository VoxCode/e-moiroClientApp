import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {BusinessGameBlock} from "./business-game-block";


@Component({
  selector: 'app-business-game-block',
  templateUrl: './business-game-block.component.html',
  styleUrls: ['./business-game-block.component.scss']
})
export class BusinessGameBlockComponent implements OnInit {

  @Input() businessGameBlock: BusinessGameBlock = new BusinessGameBlock();
  @Output() dataChanged = new EventEmitter<BusinessGameBlock>();
  @Output() blockDeleted = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeData(): void {
    this.dataChanged.emit(this.businessGameBlock);
  }

  addField(): void {
    this.businessGameBlock.dataFields.push('');
    this.changeData();
  }

  deleteValue(index: number): void {
    this.businessGameBlock.dataFields.splice(index, 1);
    this.changeData();
  }

  textareaValueChange(event: any, index: number): void {
    if (index < 0){
      this.businessGameBlock.title = event.target.value;
    }
    else {
      this.businessGameBlock.dataFields[index] = event.target.value;
    }
    this.changeData();
  }

  deleteBlock(): void {
    this.blockDeleted.emit(true);
  }
}
