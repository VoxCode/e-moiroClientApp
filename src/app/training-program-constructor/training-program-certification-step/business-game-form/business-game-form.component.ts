import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TrainingProgram} from '../../../models/TrainingProgram';
import {CertificationType} from '../../../models/CertificationType';
import {TrainingProgramFinalExamination} from '../../../models/TrainingProgramFinalExamination';
import {FinalExaminationService} from '../../../services/final-examination.service';
import {TrainingProgramFinalExaminationService} from '../../../services/training-program-final-examination.service';
import {CertificationTypeService} from '../../../services/certification-type.service';
import {Globals} from '../../../globals';
import {TrainingProgramConstructorService} from '../../training-program-constructor.service';
import {ActivatedRoute} from '@angular/router';
import {FinalExamination} from '../../../models/FinalExamination';
import {SyncfusionRichTextEditorComponent} from '../../../document-editor/rich-text-editor/syncfusion-rich-text-editor.component';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {BusinessGame} from "./business-game";
import {BusinessGameConstructorComponent} from "../../main-step-constructors/business-game-constructor/business-game-constructor.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-business-game-form',
  templateUrl: './business-game-form.component.html',
  styleUrls: ['./business-game-form.component.scss'],
  providers: [
    FinalExaminationService,
    TrainingProgramFinalExaminationService,
    CertificationTypeService
  ]
})
export class BusinessGameFormComponent implements OnInit {

  @ViewChild('RTE') rte: SyncfusionRichTextEditorComponent;
  @Input() trainingProgram: TrainingProgram;
  @Input() certificationType: CertificationType;

  bGameObject: BusinessGame = new BusinessGame();

  finalExamination: FinalExamination = new FinalExamination();
  businessGameInTrainingProgramFinalExamination: TrainingProgramFinalExamination = new TrainingProgramFinalExamination();

  constructor(
    public globals: Globals,
    public dialog: MatDialog,
    private finalExaminationService: FinalExaminationService,
    private trainingProgramFinalExaminationService: TrainingProgramFinalExaminationService,
  ) { }

  ngOnInit(): void {
    this.bGameObject.createEmpty();
    this.loadTrainingProgramFinalExamination(this.trainingProgram.id);
  }

  writeToRichText(): void {
    this.rte.setValue(this.businessGameInTrainingProgramFinalExamination.content);
  }

  loadTrainingProgramFinalExamination(trainingProgramId: number): void {
    this.trainingProgramFinalExaminationService.getValuesFromTrainingProgram(trainingProgramId)
      .subscribe((trainingProgramFinalExaminations: TrainingProgramFinalExamination[]) => {
        if (trainingProgramFinalExaminations.length !== 0){
          trainingProgramFinalExaminations.sort((a, b) => a.serialNumber - b.serialNumber);
          const obj = trainingProgramFinalExaminations[0];
          this.businessGameInTrainingProgramFinalExamination.id = obj.id;
          this.businessGameInTrainingProgramFinalExamination.trainingProgramId = obj.trainingProgramId;
          this.businessGameInTrainingProgramFinalExamination.content = obj.content;
          this.businessGameInTrainingProgramFinalExamination.serialNumber = obj.serialNumber;
          this.bGameObject.parseToView(this.businessGameInTrainingProgramFinalExamination.content);
          console.log('loaded game');
          console.log(obj);
          console.log(this.bGameObject);
        }
        else {
          this.businessGameInTrainingProgramFinalExamination.id = 0;
          this.businessGameInTrainingProgramFinalExamination.trainingProgramId = this.trainingProgram.id;
          this.businessGameInTrainingProgramFinalExamination.content = '<p><i>Задачи:</i></p><br>\n' +
            '<p><i>Сценарий</i></p>\n' +
            '<p><i>Вводная часть</i></p><br>\n' +
            '<p><i>Основная часть</i></p><br>\n' +
            '<p><i>Заключительная часть</i></p><br>';
          console.log('new game');
        }
        this.writeToRichText();
      });
  }

  createTrainingProgramFinalExamination(trainingProgramFinalExamination: TrainingProgramFinalExamination): void {
    this.trainingProgramFinalExaminationService.createValue(trainingProgramFinalExamination)
      .subscribe((trainingProgramFinalExaminationResponse: TrainingProgramFinalExamination) => {
        this.businessGameInTrainingProgramFinalExamination = trainingProgramFinalExaminationResponse;
        console.log('Create was successful!');
      });
  }

  updateTrainingProgramFinalExamination(trainingProgramFinalExamination: TrainingProgramFinalExamination): void {
    this.trainingProgramFinalExaminationService.updateValue(trainingProgramFinalExamination)
      .subscribe(() => {
        console.log('Update was successful!');
      });
  }

  save(): void {
    this.businessGameInTrainingProgramFinalExamination.content = this.bGameObject.parseToStore();
    if (this.businessGameInTrainingProgramFinalExamination.id > 0)
    {
      this.updateTrainingProgramFinalExamination(this.businessGameInTrainingProgramFinalExamination);
    }
    else {
      this.createTrainingProgramFinalExamination(this.businessGameInTrainingProgramFinalExamination);
    }
  }

  editBusinessGame(): void {
    const auxBGameObject = new BusinessGame().parseToView(this.businessGameInTrainingProgramFinalExamination.content);
    const dialogRef = this.dialog.open(BusinessGameConstructorComponent, {
      width: '80vw',
      maxWidth: '80vw',
      data: {bGameObject: auxBGameObject, params: {topicNeeded: false }}
    });

    dialogRef.componentInstance.bGameChange.subscribe((res) => {
      this.bGameObject = res;
      this.save();
    });

    dialogRef.afterClosed().subscribe((res: BusinessGame) => {
      if (!res) {
        return;
      }
      this.bGameObject = res;
      this.save();
    });
  }
}
