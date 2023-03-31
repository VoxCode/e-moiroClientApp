import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {log} from "util";

@Component({
  selector: 'app-business-game-block',
  templateUrl: './business-game-block.component.html',
  styleUrls: ['./business-game-block.component.scss']
})
export class BusinessGameBlockComponent implements OnInit {

  @Input() title: string;
  @Input() dataFields: string[] = [];
  @Output() dataChanged = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  changeData(): void {
    this.dataChanged.emit(this.dataFields);
  }

  addField(): void {
    this.dataFields.push('');
    this.changeData();
  }

  deleteValue(index: number): void {
    this.dataFields.splice(index, 1);
    this.changeData();
  }

  textareaValueChange(event: any, index: number): void {
    this.dataFields[index] = event.target.value;
    this.changeData();
  }
}
