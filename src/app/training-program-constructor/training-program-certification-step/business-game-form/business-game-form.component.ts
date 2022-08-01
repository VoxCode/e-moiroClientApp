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
import {SyncfusionRichTextEditorComponent} from "../../../document-editor/rich-text-editor/syncfusion-rich-text-editor.component";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs/operators";

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

  scenario: any[] = ['qwe', 'asd', 'zxc'];

  finalExamination: FinalExamination = new FinalExamination();
  businessGame: TrainingProgramFinalExamination = new TrainingProgramFinalExamination();

  constructor(
    public globals: Globals,
    private finalExaminationService: FinalExaminationService,
    private trainingProgramFinalExaminationService: TrainingProgramFinalExaminationService,
  ) { }

  ngOnInit(): void {
    this.loadTrainingProgramFinalExamination(this.trainingProgram.id);
  }

  writeToRichText(): void {
    this.rte.setValue(this.businessGame.content);
  }

  loadTrainingProgramFinalExamination(trainingProgramId: number): void {
    this.trainingProgramFinalExaminationService.getValuesFromTrainingProgram(trainingProgramId)
      .subscribe((trainingProgramFinalExaminations: TrainingProgramFinalExamination[]) => {
        if (trainingProgramFinalExaminations.length !== 0){
          trainingProgramFinalExaminations.sort((a, b) => a.serialNumber - b.serialNumber);
          const obj = trainingProgramFinalExaminations[0];
          this.businessGame.id = obj.id;
          this.businessGame.trainingProgramId = obj.trainingProgramId;
          this.businessGame.content = obj.content;
          this.businessGame.serialNumber = obj.serialNumber;
          console.log('loaded game');
          console.log(obj);
        }
        else {
          this.businessGame.id = 0;
          this.businessGame.trainingProgramId = this.trainingProgram.id;
          this.businessGame.content = '<p><i>Задачи:</i></p><br>\n' +
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
        this.businessGame = trainingProgramFinalExaminationResponse;
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
    if (this.businessGame.id > 0)
    {
      this.updateTrainingProgramFinalExamination(this.businessGame);
    }
    else {
      this.createTrainingProgramFinalExamination(this.businessGame);
    }
  }

  updateBusinessGameContent(value: string): void{
    this.businessGame.content = value;
    console.log(this.businessGame.content);
    this.save();
  }

  addScenarioField() {
    this.scenario.push('');
  }

  updateScenarioField() {

  }

  removeScenarioField() {

  }

  saveBusinessGame() {

  }
}
