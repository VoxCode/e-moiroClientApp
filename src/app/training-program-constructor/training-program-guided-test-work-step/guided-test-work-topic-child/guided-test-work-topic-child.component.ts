import {Component, Input, OnInit} from '@angular/core';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {GuidedTestWorkAssignmentService} from '../../../services/guided-test-work-assignment.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GuidedTestWorkAssignment} from '../../../models/GuidedTestWorkAssignment';
import {GuidedTestWorkAssignmentEditComponent} from '../../../guided-test-work-assignment/guided-test-work-assignment-edit.component';
import {IsDeleteComponent} from '../../../is-delete/is-delete.component';

@Component({
  selector: 'app-guided-test-work-topic-child',
  templateUrl: './guided-test-work-topic-child.component.html',
  styleUrls: ['./guided-test-work-topic-child.component.scss'],
  providers: [
    GuidedTestWorkAssignmentService
  ]
})

export class GuidedTestWorkTopicChildComponent implements OnInit {
  @Input() done: any[] = [];
  @Input() curriculumTopicTrainingProgramId: number;

  modalRef: MDBModalRef;

  constructor(
    private guidedTestWorkAssignmentService: GuidedTestWorkAssignmentService,
    private modalService: MDBModalService) { }

  ngOnInit(): void {
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

  save(): void {
    const guidedTestWorkAssignments: GuidedTestWorkAssignment[] = [];
    this.done.forEach((object, index) => {
      object.serialNumber = ++index;
      object.curriculumTopicTrainingProgramId = this.curriculumTopicTrainingProgramId;
      guidedTestWorkAssignments.push(object);
    });
    this.guidedTestWorkAssignmentService.updateSerialNumbers(guidedTestWorkAssignments).subscribe(() => {
      console.log('Successful!');
    });
  }

  crateGuidedTestWorkAssignment(guidedTestWorkAssignment: GuidedTestWorkAssignment): void {
    guidedTestWorkAssignment.serialNumber = this.done.length + 1;
    this.guidedTestWorkAssignmentService.createValue(guidedTestWorkAssignment)
      .subscribe((guidedTestWorkAssignmentResponse: GuidedTestWorkAssignment) => {
        if (!guidedTestWorkAssignmentResponse) { return; }
        this.done.push(guidedTestWorkAssignmentResponse);
        console.log('Crate was successful');
      });
  }

  updateGuidedTestWorkAssignment(guidedTestWorkAssignment: GuidedTestWorkAssignment): void {
    this.guidedTestWorkAssignmentService.updateValue(guidedTestWorkAssignment).subscribe(() => {
      console.log('Update was successful');
    });
  }

  deleteGuidedTestWorkAssignment(item: any, index: number): void {
    const editableRow = {heading: item.name};
    this.modalRef = this.modalService.show(IsDeleteComponent, this.modalOption(editableRow));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      if (newElement) {
        this.guidedTestWorkAssignmentService.deleteValue(item.id).subscribe(() => {
          this.done.splice(index, 1);
          console.log('Delete was successful');
        });
      }
    });
  }

  guidedTestWorkAssignmentAddForm(): void {
    this.modalRef = this.modalService.show(GuidedTestWorkAssignmentEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.crateGuidedTestWorkAssignment(newElement);
    });
  }

  guidedTestWorkAssignmentEditForm(el: GuidedTestWorkAssignment): void {
    this.modalRef = this.modalService.show(GuidedTestWorkAssignmentEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      el.content = newElement.content;
      this.updateGuidedTestWorkAssignment(el);
    });
  }

  emptyEl(): any {
    return {id: 0, content: '', serialNumber: 0, curriculumTopicTrainingProgramId: this.curriculumTopicTrainingProgramId};
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
}
