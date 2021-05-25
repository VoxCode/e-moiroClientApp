import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../../models/TrainingProgram';
import {TrainingProgramService} from '../../services/training-program.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MainLiteratureService} from '../../services/main-literature.service';
import {TrainingProgramMainLiterature} from '../../models/TrainingProgramMainLiterature';
import {TrainingProgramMainLiteratureService} from '../../services/training-program-main-literature.service';
import {MainLiterature} from '../../models/MainLiterature';
import {CurriculumTopicTrainingProgramService} from '../../services/curriculum-topic-training-program.service';
import {CurriculumTopicTrainingProgram} from '../../models/СurriculumTopicTrainingProgram';
import {Globals} from '../../globals';
import {TrainingProgramAdditionalLiterature} from '../../models/TrainingProgramAdditionalLiterature';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {MainLiteratureEditComponent} from '../../main-literature/main-literature-edit.component';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';

@Component({
  selector: 'app-training-program-main-literature-step',
  templateUrl: './training-program-main-literature-step.component.html',
  styleUrls: ['./training-program-main-literature-step.component.scss'],
  providers: [
    TrainingProgramService,
    MainLiteratureService,
    TrainingProgramMainLiteratureService,
    CurriculumTopicTrainingProgramService
  ]
})
export class TrainingProgramMainLiteratureStepComponent implements OnInit {
  id: number;
  todo: any[] = [];
  done: any[] = [];
  trainingProgram: TrainingProgram;
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[];
  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram;
  mainLiterature: MainLiterature = new MainLiterature();
  modalRef: MDBModalRef;

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
    private trainingProgramService: TrainingProgramService,
    private mainLiteratureService: MainLiteratureService,
    private trainingProgramMainLiteratureService: TrainingProgramMainLiteratureService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // this.save();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      // this.save();
    }
  }

  loadTrainingProgram(): void {
    this.trainingProgramConstructorService.TrainingProgram(this.id)
      .subscribe((trainingProgramResponse: TrainingProgram) => {
        this.trainingProgram = trainingProgramResponse;
        this.loadTrainingProgramMainLiterature();
      });
  }

  loadTrainingProgramMainLiterature(): void {
    this.trainingProgramMainLiteratureService.getValuesFromTrainingProgram(this.id)
      .subscribe((trainingProgramMainLiteratures: TrainingProgramMainLiterature[]) => {
        if (trainingProgramMainLiteratures.length !== 0) {
          trainingProgramMainLiteratures
            .sort((a, b) => a.serialNumber - b.serialNumber);
          trainingProgramMainLiteratures.forEach((obj) => {
            this.done.push({
              id: obj.id,
              trainingProgramId: obj.trainingProgramId,
              content: obj.content,
              serialNumber: obj.serialNumber
            });
          });
        }
      });
  }

  loadCurriculumTopicTrainingProgram(): void {
    this.curriculumTopicTrainingProgramService.getValue(this.id).subscribe((data: CurriculumTopicTrainingProgram[]) => {
      if (data.length !== 0){
        this.curriculumTopicTrainingPrograms = data;
        // this.loadMainLiterature();
      }
    });
  }

  loadMainLiterature(): void {
    // tslint:disable-next-line:prefer-const
    // let curriculumTopicIdArray: number[] = [this.curriculumTopicTrainingPrograms.length];
    // this.curriculumTopicTrainingPrograms.forEach(i => {
    //   curriculumTopicIdArray.push(i.curriculumTopicId);
    // });
    // this.mainLiteratureService.getMainLiterature(curriculumTopicIdArray)
    //   .subscribe((data: MainLiterature[]) => {
    //     if (data !== undefined && data !== null){
    //       // tslint:disable-next-line:only-arrow-functions typedef
    //       data.sort(function(a, b) {
    //         return b.id - a.id;
    //       });
    //       data.forEach((tmp) => {
    //         const tmp2 = this.done.find(a => a.seventh === tmp.id);
    //         if (tmp2 === undefined) {
    //           this.todo.push({
    //             first: tmp.id,
    //             third: tmp.content
    //           });
    //         }
    //       });
    //     }
    //   });
  }

  crateMainLiteratureTemplate(): void {
  }

  crateTrainingProgramMainLiterature(trainingProgramMainLiterature: TrainingProgramMainLiterature): void {
    this.trainingProgramMainLiteratureService.createValue(trainingProgramMainLiterature)
      .subscribe((trainingProgramMainLiteratureResponse: TrainingProgramMainLiterature) => {
        this.done.push(this.newDoneElement(trainingProgramMainLiteratureResponse));
        console.log('Crate was successful!');
      });
  }

  updateTrainingProgramMainLiterature(item: any): void {
    const trainingProgramMainLiterature = new TrainingProgramMainLiterature(
      item.id,
      item.trainingProgramId,
      item.content,
      item.serialNumber
    );
    this.trainingProgramMainLiteratureService.updateValue(trainingProgramMainLiterature)
      .subscribe(() => {
        console.log('Update was successful!');
      });
  }

  deleteTrainingProgramMainLiterature(id: number, index: number): void {
    this.trainingProgramMainLiteratureService.deleteValue(id).subscribe(() => {
      this.done.splice(index, 1);
      console.log('Delete was successful ' + id);
    });
  }

  // SAVE FULL
  save(): void {
    // let i = 0;
    // this.done.forEach((object, index) => {
    //   let trainingProgramMainLiterature: TrainingProgramMainLiterature = new TrainingProgramMainLiterature();
    //   i = index + 1;
    //   if (object.fourth !== undefined){
    //     trainingProgramMainLiterature.id = +object.fourth;
    //     trainingProgramMainLiterature.trainingProgramId = +object.fifth;
    //     trainingProgramMainLiterature.mainLiteratureId = +object.seventh;
    //   }
    //   else {
    //     trainingProgramMainLiterature.mainLiteratureId = +object.first;
    //     trainingProgramMainLiterature.trainingProgramId = +this.id;
    //   }
    //   trainingProgramMainLiterature.serialNumber = +i;
    //
    //   if (trainingProgramMainLiterature.id === undefined){
    //     this.trainingProgramMainLiteratureService.createValue(trainingProgramMainLiterature)
    //       .subscribe((data: TrainingProgramMainLiterature) => {
    //         object.fourth = data.id;
    //         console.log('Save was successful');
    //         trainingProgramMainLiterature = null;
    //       });
    //   }
    //   else {
    //     this.update(trainingProgramMainLiterature);
    //     trainingProgramMainLiterature = null;
    //   }
    // });
  }

  trainingProgramMainLiteratureCrateForm(): void {
    this.modalRef = this.modalService.show(MainLiteratureEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const trainingProgramAdditionalLiterature = new TrainingProgramAdditionalLiterature(
        0,
        this.id,
        newElement.last,
        this.done.length + 1
      );
      this.crateTrainingProgramMainLiterature(trainingProgramAdditionalLiterature);
    });
  }

  trainingProgramMainLiteratureEditForm(item: any): void {
    const el = this.emptyEl();
    el.last = item.content;
    this.modalRef = this.modalService.show(MainLiteratureEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      item.content = newElement.last;
      this.updateTrainingProgramMainLiterature(item);
    });
  }

  emptyEl(): any {
    return {id: 0, first: '', last: ''};
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

  newDoneElement(model: TrainingProgramMainLiterature): any {
    return {
      id: model.id,
      trainingProgramId: model.trainingProgramId,
      content: model.content,
      serialNumber: model.serialNumber
    };
  }
}
