import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../../models/TrainingProgram';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RegulationService} from '../../services/regulation.service';
import {TrainingProgramRegulationService} from '../../services/training-program-regulation.service';
import {Regulation} from '../../models/Regulation';
import {TrainingProgramRegulation} from '../../models/TrainingProgramRegulation';
import {Globals} from '../../globals';
import {RegulationEditComponent} from '../../regulation/regulation-edit.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';

@Component({
  selector: 'app-training-program-regulation-step',
  templateUrl: './training-program-regulation-step.component.html',
  styleUrls: ['./training-program-regulation-step.component.scss'],
  providers: [
    RegulationService,
    TrainingProgramRegulationService
  ]
})
export class TrainingProgramRegulationStepComponent implements OnInit {
  id: number;
  todo: any = [];
  done: any = [];
  trainingProgram: TrainingProgram;
  regulation: Regulation = new Regulation();
  modalRef: MDBModalRef;

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
    private regulationService: RegulationService,
    private trainingProgramRegulationService: TrainingProgramRegulationService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
    this.loadRegulation();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
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

  loadTrainingProgram(): void {
    this.trainingProgramConstructorService.TrainingProgram(this.id)
      .subscribe((trainingProgramResponse: TrainingProgram) => {
        this.trainingProgram = trainingProgramResponse;
        this.loadTrainingProgramRegulation();
      });
  }

  loadTrainingProgramRegulation(): void {
    this.trainingProgramRegulationService.getValuesFromTrainingProgram(this.id)
      .subscribe((trainingProgramRegulations: TrainingProgramRegulation[]) => {
        if (trainingProgramRegulations.length !== 0){
          trainingProgramRegulations.sort((a, b) => a.serialNumber - b.serialNumber);
          trainingProgramRegulations.forEach((trainingProgramRegulation ) => {
            this.done.push({
              id: trainingProgramRegulation.id,
              trainingProgramId: trainingProgramRegulation.trainingProgramId,
              content: trainingProgramRegulation.content,
              serialNumber: trainingProgramRegulation.serialNumber
            });
          });
        }
      });
  }

  loadRegulation(): void {
    this.regulationService.getValues().subscribe((regulations: Regulation[]) => {
      if (regulations.length !== 0) {
        regulations.sort((a, b) => b.id - a.id);
        regulations.forEach((regulation) => {
          this.todo.push({
            regulationId: regulation.id,
            topicTitle: regulation.content
          });
        });
      }
    });
  }

  crateTrainingProgramRegulation(trainingProgramRegulation: TrainingProgramRegulation): void {
    this.trainingProgramRegulationService.createValue(trainingProgramRegulation)
      .subscribe((trainingProgramRegulationResponse: TrainingProgramRegulation) => {
        this.done.push(this.newDoneElement(trainingProgramRegulationResponse));
        console.log('Crate was successful!');
      });
  }

  updateTrainingProgramRegulation(item: any): void {
    const trainingProgramRegulation = new TrainingProgramRegulation(
      item.id,
      item.trainingProgramId,
      item.content,
      item.serialNumber
    );
    this.trainingProgramRegulationService.updateValue(trainingProgramRegulation)
      .subscribe(() => {
        console.log('Update was successful!');
      });
  }

  deleteTrainingProgramRegulation(id: number, index: number): void {
    this.trainingProgramRegulationService.deleteValue(id).subscribe(() => {
      this.done.splice(index, 1);
      console.log('Delete was successful!');
    });
  }

  save(): void {
    const trainingProgramRegulations: TrainingProgramRegulation[] = [];
    this.done.forEach((object, index) => {
      const trainingProgramRegulation: TrainingProgramRegulation = new TrainingProgramRegulation();
      trainingProgramRegulation.id = +object.id;
      trainingProgramRegulation.trainingProgramId = +object.trainingProgramId;
      trainingProgramRegulation.content = object.content;
      trainingProgramRegulation.serialNumber = ++index;
      trainingProgramRegulations.push(trainingProgramRegulation);


      // if (!trainingProgramRegulation.id) {
      //   this.trainingProgramRegulationService.createValue(trainingProgramRegulation)
      //     .subscribe((data: TrainingProgramRegulation) => {
      //       object.fourth = data.id;
      //       object.fifth = data.trainingProgramId;
      //       object.seventh = data.regulationId;
      //       object.eight = data.serialNumber;
      //       console.log('Save was successful');
      //       trainingProgramRegulation = null;
      //     });
      // }
      // else {
      //   this.update(trainingProgramRegulation);
      //   trainingProgramRegulation = null;
      // }
    });
    this.trainingProgramRegulationService.updateSerialNumbers(trainingProgramRegulations).subscribe(() => {
      console.log('Successful!');
    });
  }

  trainingProgramRegulationCrateForm(): void {
    this.modalRef = this.modalService.show(RegulationEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const trainingProgramRegulation = new TrainingProgramRegulation(
        0,
        this.id,
        newElement.last,
        this.done.length + 1
      );
      this.crateTrainingProgramRegulation(trainingProgramRegulation);
    });
  }

  trainingProgramRegulationEditForm(item: any): void {
    const el = this.emptyEl();
    el.last = item.content;
    this.modalRef = this.modalService.show(RegulationEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      item.content = newElement.last;
      this.updateTrainingProgramRegulation(item);
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

  newDoneElement(model: TrainingProgramRegulation): any {
    return {
      id: model.id,
      trainingProgramId: model.trainingProgramId,
      content: model.content,
      serialNumber: model.serialNumber
    };
  }
}
