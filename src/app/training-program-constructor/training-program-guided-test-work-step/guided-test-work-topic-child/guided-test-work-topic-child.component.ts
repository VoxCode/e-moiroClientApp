import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {GuidedTestWorkAssignmentService} from '../../../services/guided-test-work-assignment.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GuidedTestWorkAssignment} from '../../../models/GuidedTestWorkAssignment';

@Component({
  selector: 'app-guided-test-work-topic-child',
  templateUrl: './guided-test-work-topic-child.component.html',
  styleUrls: ['./guided-test-work-topic-child.component.scss'],
  providers: [
    GuidedTestWorkAssignmentService
  ]
})

export class GuidedTestWorkTopicChildComponent implements OnInit {
  @Input() guidedTestWorkAssignments: GuidedTestWorkAssignment[];
  done = [];

  modalRef: MDBModalRef;

  constructor(
    private guidedTestWorkAssignmentService: GuidedTestWorkAssignmentService,
    private modalService: MDBModalService) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    }
  }

  // loadGuidedTestWorkAssignments(): void {
  //   this.trainingProgramCurriculumSectionService.GetFromTrainingProgram(this.trainingProgram.id)
  //     .subscribe((trainingProgramCurriculumSections: TrainingProgramCurriculumSection[]) => {
  //       if (!trainingProgramCurriculumSections || trainingProgramCurriculumSections.length === 0) { return; }
  //       trainingProgramCurriculumSections.sort((a, b) => a.sectionNumber - b.sectionNumber);
  //       this.trainingProgramCurriculumSections = trainingProgramCurriculumSections;
  //       this.trainingProgramCurriculumSectionSelectList = trainingProgramCurriculumSections;
  //     });
  // }
  //
  // crateGuidedTestWorkAssignment(trainingProgramCurriculumSection: TrainingProgramCurriculumSection): void {
  //   this.trainingProgramCurriculumSectionService.createValue(trainingProgramCurriculumSection)
  //     .subscribe((trainingProgramCurriculumSectionResponse: TrainingProgramCurriculumSection) => {
  //       if (!trainingProgramCurriculumSectionResponse) { return; }
  //       this.trainingProgramCurriculumSections.push(trainingProgramCurriculumSectionResponse);
  //       console.log('Crate was successful');
  //     });
  // }
  //
  // updateTrainingProgramCurriculumSection(trainingProgramCurriculumSection: TrainingProgramCurriculumSection): void {
  //   this.trainingProgramCurriculumSectionService.updateValue(trainingProgramCurriculumSection).subscribe(() => {
  //     console.log('Update was successful');
  //   });
  // }
  //
  // deleteTrainingProgramCurriculumSection(item: any, index: number): void {
  //   const editableRow = {heading: item.name};
  //   this.modalRef = this.modalService.show(IsDeleteComponent, this.modalOption(editableRow));
  //   this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
  //     if (newElement) {
  //       this.trainingProgramCurriculumSectionService.deleteValue(item.id).subscribe(() => {
  //         this.trainingProgramCurriculumSections.splice(index, 1);
  //         console.log('Delete was successful');
  //       });
  //     }
  //   });
  // }
  //
  // addNewTemplate(newTemplate: CurriculumTopic ): void {
  //   this.newTodoValue.emit(newTemplate);
  // }
  //
  // curriculumSectionAddForm(): void {
  //   this.modalRef = this.modalService.show(CurriculumSectionEditComponent, this.modalOption(this.emptyEl()));
  //   this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
  //     const trainingProgramCurriculumSection = new TrainingProgramCurriculumSection(
  //       0,
  //       this.trainingProgram.id,
  //       this.trainingProgramCurriculumSections.length + 1,
  //       newElement.last);
  //     this.crateTrainingProgramCurriculumSection(trainingProgramCurriculumSection);
  //   });
  // }
  //
  // curriculumSectionEditForm(trainingProgramCurriculumSection: TrainingProgramCurriculumSection): void {
  //   const el = {id: 0, first: '', last: trainingProgramCurriculumSection.name};
  //   this.modalRef = this.modalService.show(CurriculumSectionEditComponent, this.modalOption(el));
  //   this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
  //     trainingProgramCurriculumSection.name = newElement.last;
  //     this.updateTrainingProgramCurriculumSection(trainingProgramCurriculumSection);
  //   });
  // }
  //
  // emptyEl(): any {
  //   return {id: 0, first: '', last: ''};
  // }
  //
  // modalOption(el: any): any {
  //   return {
  //     backdrop: true,
  //     keyboard: true,
  //     focus: true,
  //     show: false,
  //     ignoreBackdropClick: true,
  //     class: 'modal-fluid',
  //     containerClass: '',
  //     animated: true,
  //     data: {
  //       editableRow: el
  //     }
  //   };
  // }
  GuidedTestWorkAssignmentAddForm(): void {

  }
}
