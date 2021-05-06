import {Component, Input, OnInit} from '@angular/core';
import {OccupationForm} from '../../../models/OccupationForm';
import {TrainingProgramCurriculumSectionService} from '../../../services/training-program-curriculum-section.service';
import {TrainingProgramCurriculumSection} from '../../../models/TrainingProgramCurriculumSection';
import {TrainingProgram} from '../../../models/TrainingProgram';
import {CurriculumSectionEditComponent} from '../../../curriculum-section/curriculum-section-edit.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';

@Component({
  selector: 'app-curriculum-section-child',
  templateUrl: './curriculum-section-child.component.html',
  styleUrls: ['./curriculum-section-child.component.scss'],
  providers: [
    TrainingProgramCurriculumSectionService
  ]
})

export class CurriculumSectionChildComponent implements OnInit {
  @Input() trainingProgram: TrainingProgram;
  @Input() occupationForms: OccupationForm[];
  trainingProgramCurriculumSections: TrainingProgramCurriculumSection[] = [];
  trainingProgramCurriculumSectionSelectList: TrainingProgramCurriculumSection[] = [];
  modalRef: MDBModalRef;

  constructor(
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.loadTrainingProgramCurriculumSections();
  }

  loadTrainingProgramCurriculumSections(): void {
      this.trainingProgramCurriculumSectionService.GetFromTrainingProgram(this.trainingProgram.id)
        .subscribe((trainingProgramCurriculumSections: TrainingProgramCurriculumSection[]) => {
          if (trainingProgramCurriculumSections.length !== 0) {
            trainingProgramCurriculumSections.sort((a, b) => a.sectionNumber - b.sectionNumber);
            this.trainingProgramCurriculumSections = trainingProgramCurriculumSections;
            this.trainingProgramCurriculumSectionSelectList = trainingProgramCurriculumSections;
          }
        });
  }

  crateTrainingProgramCurriculumSection(trainingProgramCurriculumSection: TrainingProgramCurriculumSection): void {
    this.trainingProgramCurriculumSectionService.createValue(trainingProgramCurriculumSection)
      .subscribe((trainingProgramCurriculumSectionResponse: TrainingProgramCurriculumSection) => {
        this.trainingProgramCurriculumSections.push(trainingProgramCurriculumSectionResponse);
        console.log('Crate was successful');
      });
  }

  updateTrainingProgramCurriculumSection(trainingProgramCurriculumSection: TrainingProgramCurriculumSection): void {
    this.trainingProgramCurriculumSectionService.updateValue(trainingProgramCurriculumSection)
      .subscribe(() => {
        console.log('Update was successful');
      });
  }

  deleteTrainingProgramCurriculumSection(index: number, id: number): void {
    this.trainingProgramCurriculumSectionService.deleteValue(id).subscribe(() => {
      this.trainingProgramCurriculumSections.splice(index, 1);
      console.log('Delete was successful');
    });
  }

  swapTrainingProgramCurriculumSection(index: number): void {
    const trainingProgramCurriculumSection = this.trainingProgramCurriculumSectionSelectList[index];
    console.log(trainingProgramCurriculumSection);

  }

  curriculumSectionAddForm(): void {
    this.modalRef = this.modalService.show(CurriculumSectionEditComponent, this.modalOption(this.emptyEl()));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      const trainingProgramCurriculumSection = new TrainingProgramCurriculumSection(
        0,
        this.trainingProgram.id,
        this.trainingProgramCurriculumSections.length + 1,
        newElement.last);
      this.crateTrainingProgramCurriculumSection(trainingProgramCurriculumSection);
    });
  }

  curriculumSectionEditForm(trainingProgramCurriculumSection: TrainingProgramCurriculumSection): void {
    const el = {id: 0, first: '', last: trainingProgramCurriculumSection.name};
    this.modalRef = this.modalService.show(CurriculumSectionEditComponent, this.modalOption(el));
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      trainingProgramCurriculumSection.name = newElement.last;
      this.updateTrainingProgramCurriculumSection(trainingProgramCurriculumSection);
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
}
