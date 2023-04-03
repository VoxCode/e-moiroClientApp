import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {TrainingProgram} from '../../../models/TrainingProgram';
import {TrainingProgramCurriculumSection} from '../../../models/TrainingProgramCurriculumSection';
import {OccupationForm} from '../../../models/OccupationForm';
import {CurriculumTopicTrainingProgramService} from '../../../services/curriculum-topic-training-program.service';
import {CurriculumTopicEditComponent} from '../../../curriculum-topic/curriculum-topic-edit.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {CurriculumTopicTemplateComponent} from '../../../curriculum-topic/curriculum-topic-template.component';
import {CurriculumTopic} from '../../../models/CurriculumTopic';
import {Globals} from '../../../globals';
import {CurriculumTopicService} from '../../../services/curriculum-topic.service';
import {IsDeleteComponent} from '../../../is-delete/is-delete.component';
import {TrainingProgramMainStepCurriculumTypeFormComponent} from "../training-program-main-step-curriculum-type-form/training-program-main-step-curriculum-type-form.component";
import {MatDialog} from "@angular/material/dialog";
import {BusinessGameConstructorComponent} from "../../main-step-constructors/business-game-constructor/business-game-constructor.component";
import {StaticData} from "../../../static-data/static-data";
import {BusinessGame} from "../../training-program-certification-step/business-game-form/business-game";

@Component({
  selector: 'app-curriculum-topic-child',
  templateUrl: './curriculum-topic-child.component.html',
  styleUrls: ['./curriculum-topic-child.component.scss'],
  providers: [
    CurriculumTopicTrainingProgramService,
    StaticData,
  ]
})
export class CurriculumTopicChildComponent implements OnInit {
  @Input() trainingProgram: TrainingProgram;
  @Input() trainingProgramCurriculumSection: TrainingProgramCurriculumSection;
  @Input() occupationForms: OccupationForm[];
  @Output() newTodoValue = new EventEmitter<CurriculumTopic>();
  done: any[] = [];
  modalRef: MDBModalRef;
  plurals = {
    result: {
      '=1': 'час',
      '=2': 'часа',
      '=3': 'часа',
      '=4': 'часа',
      other: 'часов'
    },
  };

  constructor(
    public globals: Globals,
    public staticData: StaticData,
    public dialog: MatDialog,
    private modalService: MDBModalService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumTopicService: CurriculumTopicService) {
  }

  ngOnInit(): void {
    this.loadCurriculumTopicTrainingPrograms();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container && this.trainingProgramCurriculumSection.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.save();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.save();
    }
  }

  loadCurriculumTopicTrainingPrograms(): void {
    this.curriculumTopicTrainingProgramService.getFromTrainingProgramCurriculumSection(this.trainingProgramCurriculumSection.id)
      .subscribe((curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[]) => {
        if (!curriculumTopicTrainingPrograms || curriculumTopicTrainingPrograms.length === 0) {
          return;
        }
        curriculumTopicTrainingPrograms
          .sort((a, b) => a.serialNumber - b.serialNumber);
        curriculumTopicTrainingPrograms.forEach((curriculumTopicTrainingProgram) => {
          this.done.push(this.newDoneElement(curriculumTopicTrainingProgram));
        });
      });
  }

  crateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram): void {
    this.curriculumTopicTrainingProgramService.createValue(curriculumTopicTrainingProgram)
      .subscribe((curriculumTopicTrainingProgramResponse: CurriculumTopicTrainingProgram) => {
        this.done.push(this.newDoneElement(curriculumTopicTrainingProgramResponse));
      });
  }

  updateCurriculumTopicTrainingProgram(item: any): void {
    const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
    curriculumTopicTrainingProgram.id = item.curriculumTopicTrainingProgramId;
    curriculumTopicTrainingProgram.isVariable = item.isVariable;
    curriculumTopicTrainingProgram.topicTitle = item.topicTitle;
    curriculumTopicTrainingProgram.annotation = item.annotation;
    curriculumTopicTrainingProgram.serialNumber = item.serialNumber;
    curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = item.trainingProgramCurriculumSectionId;
    curriculumTopicTrainingProgram.testWorkHours = item.testWorkHours;
    curriculumTopicTrainingProgram.curriculumTopicTypeId = item.curriculumTopicTypeId;
    this.curriculumTopicTrainingProgramService.updateValue(curriculumTopicTrainingProgram).subscribe(() => {
      console.log('Update was successful');
    });
  }

  deleteCurriculumTopicTrainingProgram(item: any, index: number): void {
    const editableRow = {heading: item.topicTitle};
    this.modalRef = this.modalService.show(IsDeleteComponent, this.modalOption(editableRow));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      if (newElement) {
        this.curriculumTopicTrainingProgramService.deleteValue(item.curriculumTopicTrainingProgramId).subscribe(() => {
          this.done.splice(index, 1);
          console.log('Delete was successful');
        });
      }
    });
  }

  save(): void {
    const curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];
    this.done.forEach((object, index) => {
      if (object.curriculumTopicId) {
        const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram(
          0,
          false,
          ++index,
          this.trainingProgramCurriculumSection.id,
          object.topicTitle,
          object.annotation,
          object.testWorkHours,
          object.curriculumTopicTypeId);
        curriculumTopicTrainingProgram.curriculumTopicTypeId = object.curriculumTopicTypeId;
        console.log(curriculumTopicTrainingProgram);
        this.curriculumTopicTrainingProgramService.createValue(curriculumTopicTrainingProgram)
          .subscribe((curriculumTopicTrainingProgramResponse: CurriculumTopicTrainingProgram) => {
            object.serialNumber = curriculumTopicTrainingProgramResponse.serialNumber;
            object.curriculumTopicTrainingProgramId = curriculumTopicTrainingProgramResponse.id;
            object.testWorkHours = 0;
            object.curriculumTopicId = undefined;
            object.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSection.id;
            object.curriculumTopicTypeId = curriculumTopicTrainingProgramResponse.curriculumTopicTypeId;
          });
      } else {
        const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
        curriculumTopicTrainingProgram.id = object.curriculumTopicTrainingProgramId;
        curriculumTopicTrainingProgram.isVariable = object.isVariable;
        curriculumTopicTrainingProgram.topicTitle = object.topicTitle;
        curriculumTopicTrainingProgram.annotation = object.annotation;
        curriculumTopicTrainingProgram.serialNumber = ++index;
        curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSection.id;
        curriculumTopicTrainingProgram.testWorkHours = object.testWorkHours;
        curriculumTopicTrainingProgram.curriculumTopicTypeId = object.curriculumTopicTypeId;
        curriculumTopicTrainingPrograms.push(curriculumTopicTrainingProgram);
        console.log(curriculumTopicTrainingProgram);
      }
    });
    this.curriculumTopicTrainingProgramService.updateSerialNumbers(curriculumTopicTrainingPrograms).subscribe(() => {
      console.log('Successful!');
    });
  }

  crateCurriculumTopicTemplate(curriculumTopicTemplate: CurriculumTopic): void {
    this.curriculumTopicService.createValue(curriculumTopicTemplate)
      .subscribe((curriculumTopicTemplateResponse: CurriculumTopic) => {
        console.log('Save was successful!');
        this.curriculumTopicService.createRelationships(this.trainingProgram, curriculumTopicTemplateResponse.id)
          .subscribe(() => {
            this.newTodoValue.emit(curriculumTopicTemplateResponse);
            console.log('Relationships created!');
          });
      });
  }

  curriculumTopicAddForm(): void {
    const dialogTypeRef = this.dialog.open(TrainingProgramMainStepCurriculumTypeFormComponent);

    dialogTypeRef.afterClosed().subscribe(type => {
      console.log(`Dialog result: ${type}`);
      switch (type) {
        case this.staticData.trainingProgramCurriculumType.DEFAULT:
          this.modalRef = this.modalService.show(CurriculumTopicEditComponent, this.modalOption(this.emptyEl()));
          this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
            const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram(
              0,
              false,
              this.done.length + 1,
              this.trainingProgramCurriculumSection.id,
              newElement.second,
              newElement.last);
            this.crateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram);
            if (newElement.third) {
              const element = {id: 0, first: '', second: newElement.second, last: newElement.last};
              this.modalRef = this.modalService.show(CurriculumTopicTemplateComponent, this.modalOption(element));
              this.modalRef.content.saveButtonClicked.subscribe((newTemplateElement: any) => {
                const curriculumTopicTemplate = new CurriculumTopic(
                  0,
                  newTemplateElement.second,
                  newTemplateElement.last,
                  this.globals.userId
                );
                this.crateCurriculumTopicTemplate(curriculumTopicTemplate);
              });
            }
          });
          break;
        case this.staticData.trainingProgramCurriculumType.BUSINESS_GAME:
          const businessGame = new BusinessGame();
          businessGame.createBusinessGameTemplate();
          this.openAddBusinessGameConstructor(this.staticData.trainingProgramCurriculumType.BUSINESS_GAME, businessGame);
          break;
        case this.staticData.trainingProgramCurriculumType.ROUND_TABLE:
          const roundTable = new BusinessGame();
          roundTable.createRoundTableTemplate();
          this.openAddBusinessGameConstructor(this.staticData.trainingProgramCurriculumType.ROUND_TABLE, roundTable);
          break;
        case this.staticData.trainingProgramCurriculumType.TRAINING:
          const training = new BusinessGame();
          training.createTrainingTemplate();
          this.openAddBusinessGameConstructor(this.staticData.trainingProgramCurriculumType.TRAINING, training);
          break;
        case this.staticData.trainingProgramCurriculumType.CONFERENCE:
          const conference = new BusinessGame();
          conference.createConferenceTemplate();
          this.openAddBusinessGameConstructor(this.staticData.trainingProgramCurriculumType.CONFERENCE, conference);
          break;
        default:
          break;
      }
    });
  }

  openAddBusinessGameConstructor(typeId: number, template: BusinessGame): void {
    const dialogRef = this.dialog.open(BusinessGameConstructorComponent, {
      width: '80vw',
      maxWidth: '80vw',
      data: {bGameObject: template, params: {topicNeeded: true}}
    });

    dialogRef.componentInstance.bGameChange.subscribe((res) => {
      if (res) {
        const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram(
          0,
          false,
          this.done.length + 1,
          this.trainingProgramCurriculumSection.id,
          res.bGameTitle,
          res.parseToStore(),
          0,
          typeId);
        this.crateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram);
      }
    });

    dialogRef.afterClosed().subscribe((res: BusinessGame) => {
      if (res) {
        const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram(
          0,
          false,
          this.done.length + 1,
          this.trainingProgramCurriculumSection.id,
          res.bGameTitle,
          res.parseToStore(),
          0,
          typeId);
        this.crateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram);
      }
    });
  }

  openEditBusinessGameConstructor(item: any): void{
    const auxBGameObject = new BusinessGame().parseToView(item.annotation);
    auxBGameObject.bGameTitle = item.topicTitle;
    const dialogRef = this.dialog.open(BusinessGameConstructorComponent, {
      width: '80vw',
      maxWidth: '80vw',
      data: {bGameObject: auxBGameObject, params: {topicNeeded: true}},
    });

    dialogRef.componentInstance.bGameChange.subscribe((res) => {
      item.topicTitle = res.bGameTitle;
      item.annotation = res.parseToStore();
      this.updateCurriculumTopicTrainingProgram(item);
    });

    dialogRef.afterClosed().subscribe((res: BusinessGame) => {
      if (!res) {
        return;
      }
      item.topicTitle = res.bGameTitle;
      item.annotation = res.parseToStore();
      this.updateCurriculumTopicTrainingProgram(item);
    });
  }

  curriculumTopicEditForm(item: any): void {

    switch (item.curriculumTopicTypeId) {
      case this.staticData.trainingProgramCurriculumType.DEFAULT:
        break;
      case this.staticData.trainingProgramCurriculumType.BUSINESS_GAME:
        this.openEditBusinessGameConstructor(item);
        break;
      case this.staticData.trainingProgramCurriculumType.ROUND_TABLE:
        this.openEditBusinessGameConstructor(item);
        break;
      case this.staticData.trainingProgramCurriculumType.TRAINING:
        this.openEditBusinessGameConstructor(item);
        break;
      case this.staticData.trainingProgramCurriculumType.CONFERENCE:
        this.openEditBusinessGameConstructor(item);
        break;
      default:
        const el = this.emptyEl();
        el.second = item.topicTitle;
        el.last = item.annotation;
        el.isCrate = false;
        this.modalRef = this.modalService.show(CurriculumTopicEditComponent, this.modalOption(el));
        this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
          item.topicTitle = newElement.second;
          item.annotation = newElement.last;
          this.updateCurriculumTopicTrainingProgram(item);
        });
        break;
    }
  }

  emptyEl(): any {
    return {id: 0, first: '', second: '', last: '', isCrate: true};
  }

  modalOption(el: any): any {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-fluid',
      containerClass: '',
      animated: true,
      data: {
        editableRow: el
      }
    };
  }

  newDoneElement(curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram): any {
    return {
      topicTitle: curriculumTopicTrainingProgram.topicTitle,
      isVariable: curriculumTopicTrainingProgram.isVariable,
      curriculumTopicTrainingProgramId: curriculumTopicTrainingProgram.id,
      serialNumber: curriculumTopicTrainingProgram.serialNumber,
      annotation: curriculumTopicTrainingProgram.annotation,
      trainingProgramCurriculumSectionId: curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId,
      testWorkHours: curriculumTopicTrainingProgram.testWorkHours,
      curriculumTopicTypeId: curriculumTopicTrainingProgram.curriculumTopicTypeId
    };
  }
}
