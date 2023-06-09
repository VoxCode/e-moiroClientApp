import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface AcceptDeclineDialogData {
  title?: string;
  question?: string;
  yesButton?: string;
  noButton?: string;
}

@Component({
  selector: 'app-accept-decline-dialog',
  templateUrl: './accept-decline-dialog.component.html',
  styleUrls: ['./accept-decline-dialog.component.scss']
})
export class AcceptDeclineDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AcceptDeclineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AcceptDeclineDialogData,
  ) { }

  ngOnInit(): void {
    if (!this.data.title){
      this.data.title = 'Предупреждение';
    }
    if (!this.data.question){
      this.data.question = 'Подтвердить?';
    }
    if (!this.data.yesButton){
      this.data.yesButton = 'Да';
    }
    if (!this.data.noButton){
      this.data.noButton = 'Нет';
    }
  }

}
