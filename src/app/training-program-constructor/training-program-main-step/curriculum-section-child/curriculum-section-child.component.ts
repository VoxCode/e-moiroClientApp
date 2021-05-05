import {Component, Input, OnInit} from '@angular/core';
import {CurriculumSectionService} from '../../../services/curriculum-section.service';
import {OccupationForm} from '../../../models/OccupationForm';
import {CurriculumSection} from '../../../models/CurriculumSection';
import {TrainingProgramCurriculumSectionService} from '../../../services/training-program-curriculum-section.service';
import {TrainingProgramCurriculumSection} from '../../../models/TrainingProgramCurriculumSection';
import {TrainingProgram} from '../../../models/TrainingProgram';

@Component({
  selector: 'app-curriculum-section-child',
  templateUrl: './curriculum-section-child.component.html',
  styleUrls: ['./curriculum-section-child.component.scss'],
  providers: [
    TrainingProgramCurriculumSectionService,
    CurriculumSectionService,
  ]
})

export class CurriculumSectionChildComponent implements OnInit {
  @Input() trainingProgram: TrainingProgram;
  @Input() occupationForms: OccupationForm[];
  trainingProgramCurriculumSections: TrainingProgramCurriculumSection[] = [];
  curriculumSections: CurriculumSection[];

  constructor(
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private curriculumSectionService: CurriculumSectionService,
  ) { }

  ngOnInit(): void {
    this.loadTrainingProgramCurriculumSections();
  }

  loadTrainingProgramCurriculumSections(): void {
    this.trainingProgramCurriculumSectionService.getValue(this.trainingProgram.id)
      .subscribe((trainingProgramCurriculumSections: TrainingProgramCurriculumSection[]) => {
        if (trainingProgramCurriculumSections.length !== 0) {
          trainingProgramCurriculumSections.sort((a, b) => a.sectionNumber - b.sectionNumber);
          this.trainingProgramCurriculumSections = trainingProgramCurriculumSections;
          this.loadCurriculumSections();
        }
      });
  }

  loadCurriculumSections(): void {
    this.curriculumSectionService.getValues()
      .subscribe((curriculumSections: CurriculumSection[]) => {
        if (curriculumSections.length !== 0) {
          this.curriculumSections = curriculumSections;
        }
      });
  }



  // DELETE
  deleteTrainingProgramCurriculumSection(index: number, id: number): void {
    this.curriculumSectionChildren.splice(index, 1);
    this.trainingProgramCurriculumSectionService.deleteValue(id).subscribe();
  }

  // UPDATE
  updateTrainingProgramCurriculumSection(): void {
    this.trainingProgramCurriculumSectionSelect.id = this.trainingProgramCurriculumSectionId;
    this.trainingProgramCurriculumSectionService.updateValue(this.trainingProgramCurriculumSectionSelect)
      .subscribe(() => {
        console.log('Update was successful');
      });
  }

  addCurriculumSection(): void {  // тут остановился
    this.crateCurriculumSection();
  }

  crateTrainingProgramCurriculumSection(): void {
    // this.modal.show();
    const model: TrainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
    model.sectionNumber = this.curriculumSectionNumber;
    // model.curriculumSectionId = 31;
    model.id = 0;
    model.trainingProgramId = this.id;
    this.trainingProgramCurriculumSectionService.createValue(model)
      .subscribe((data: TrainingProgramCurriculumSection) => {
        this.trainingProgramCurriculumSectionSelect = data;
        this.trainingProgramCurriculumSectionSelect.name = 'Выбрите раздел';
        this.trainingProgramCurriculumSectionId = data.id;
        this.trainingProgramCurriculumSectionIdChange.emit(data.id);
        console.log('Crate was successful');
      });
  }

  crateCurriculumSection(): void {
    this.curriculumSectionService.createValue(this.curriculumSectionTmp)
      .subscribe((data: CurriculumSection) => {
        if (data) {
          this.curriculumSectionTmp.id = data.id;
          const model: TrainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
          model.id = this.trainingProgramCurriculumSectionId;
          model.curriculumSectionId = this.curriculumSectionTmp.id;
          model.name = this.curriculumSectionTmp.name;
          model.sectionNumber = this.curriculumSectionNumber;
          model.trainingProgramId = this.id;
          this.trainingProgramCurriculumSectionSelect = model;
          console.log('Success');
          this.updateTrainingProgramCurriculumSection();
          this.cancel();
          this.loadTrainingProgramCurriculumSectionAfter();
        }
      });
  }

  loadTrainingProgramCurriculumSectionAfter(): void {
    this.curriculumSectionService.getSelectValues(this.trainingProgram.departmentId)
      .subscribe((data: CurriculumSection[]) => {
        if (data.length !== 0) {
          const model: TrainingProgramCurriculumSection[] = [];
          data.forEach(tmp => {
            model.push({
              id: 0,
              trainingProgramId: this.id,
              curriculumSectionId: tmp.id,
              sectionNumber: this.curriculumSectionNumber,
              name: tmp.name
            });
          });
          this.trainingProgramCurriculumSections = model;
        }
      });
  }
}
