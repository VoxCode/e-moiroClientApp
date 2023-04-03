import {Component, Input, OnInit, Output, ViewChild, EventEmitter, Inject} from '@angular/core';
import {SyncfusionRichTextEditorComponent} from '../../../document-editor/rich-text-editor/syncfusion-rich-text-editor.component';
import {BusinessGame} from '../../training-program-certification-step/business-game-form/business-game';
import {Globals} from '../../../globals';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BusinessGameBlock} from './business-game-block/business-game-block';


@Component({
  selector: 'app-business-game-constructor',
  templateUrl: './business-game-constructor.component.html',
  styleUrls: ['./business-game-constructor.component.scss'],
  providers: [
    Globals,
  ]
})
// {provide: MAT_DIALOG_DATA, useValue: {bGameObject: null, params: {topicNeeded: true }}}
export class BusinessGameConstructorComponent implements OnInit {
  @ViewChild('RTE') rte: SyncfusionRichTextEditorComponent;
  @Input() businessGame: BusinessGame;
  @Output() bGameChange = new EventEmitter<BusinessGame>();

  currentEditTimeOutId: any;

  constructor(
    public dialogRef: MatDialogRef<BusinessGameConstructorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {bGameObject: BusinessGame, params: {topicNeeded: boolean }},
    public globals: Globals,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (!this.data){
      this.data = {bGameObject: null, params: {topicNeeded: true }};
    }
    console.log(Boolean(this.data.bGameObject));
    if (this.data.bGameObject){
      this.businessGame = this.data.bGameObject;
    }
    else {
      this.data.bGameObject = new BusinessGame();
      this.data.bGameObject.createEmpty();
      this.businessGame = this.data.bGameObject;
    }


    // if (!this.businessGame){
    //   this.businessGame = new BusinessGame();
    //   this.businessGame.createEmpty();
    // }

    this.currentEditTimeOutId = undefined;
  }

  updateData(newVal: BusinessGameBlock, updatedObject: BusinessGameBlock): void {
    this.resetTimer();
  }

  updateTitle(): void{
    this.resetTimer();
  }

  save(): void {
    if (this.currentEditTimeOutId){
      clearTimeout(this.currentEditTimeOutId);
    }
    this.dialogRef.close(this.businessGame);
  }

  resetTimer(): void{
    if (this.currentEditTimeOutId){
      clearTimeout(this.currentEditTimeOutId);
    }
    this.currentEditTimeOutId = setTimeout(() => {
      this.bGameChange.emit(this.businessGame);
    }, 10000);
  }

  closeWithoutsaving(): void {
    if (this.currentEditTimeOutId){
      clearTimeout(this.currentEditTimeOutId);
    }
    this.dialogRef.close(false);
  }

  addBlock(): void {
    const aux = new BusinessGameBlock();
    aux.createEmpty();
    this.businessGame.bGameBlocks.push(aux);
    console.log(this.businessGame);
  }

  deleteBlock(index: number): void {
    this.businessGame.bGameBlocks.splice(index, 1);
  }
}
