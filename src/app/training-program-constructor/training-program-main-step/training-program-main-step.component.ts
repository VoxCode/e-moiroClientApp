import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CurriculumTopic} from '../../models/CurriculumTopic';
import {CurriculumTopicService} from '../../services/curriculum-topic.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramService} from '../../services/training-program.service';
import {TrainingProgram} from '../../models/TrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../../services/curriculum-topic-training-program.service';
import {CurriculumTopicTrainingProgram} from '../../models/СurriculumTopicTrainingProgram';
import {CurriculumSectionService} from '../../services/curriculum-section.service';
import {OccupationFormService} from '../../services/occupation-form.service';
import {CommonService} from '../../common-service/common-service.component';
import {TrainingProgramCurriculumSectionService} from '../../services/training-program-curriculum-section.service';
import {TrainingProgramCurriculumSection} from '../../models/TrainingProgramCurriculumSection';
import {Globals} from '../../globals';
import {OccupationForm} from '../../models/OccupationForm';

@Component({
  selector: 'app-training-program-main-step',
  templateUrl: './training-program-main-step.component.html',
  styleUrls: ['./training-program-main-step..component.scss'],
  providers: [
    CurriculumTopicService,
    TrainingProgramService,
    CurriculumTopicTrainingProgramService,
    TrainingProgramCurriculumSectionService,
    OccupationFormService,
    CurriculumSectionService
  ]
})

export class TrainingProgramMainStepComponent implements OnInit{
  id: number;
  value: number;
  trainingProgram: TrainingProgram;
  curriculumTopic: CurriculumTopic;
  searchText: string;

  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram = {
    isVariable: false,
    classHours: 0,
    occupationFormId: 0
  };

  curriculumSectionChildren: any = [];
  occupationForms: OccupationForm[];
  todo = [];
  name: string;

  constructor(
    public globals: Globals,
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumSectionService: CurriculumSectionService,
    private occupationFormService: OccupationFormService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.trainingProgram = new TrainingProgram();
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
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

  // LOAD
  loadTrainingProgram(): void {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data) {
          this.trainingProgram = data;
          this.loadOccupationForm();
        }
      });
  }

  loadOccupationForm(): void {
    this.occupationFormService.getValues()
      .subscribe((data: OccupationForm[]) => {
        if (data.length !== 0){
          this.occupationForms = data;
          this.loadTrainingProgramCurriculumSection();
        }
      });
  }

  loadTrainingProgramCurriculumSection(): void {
    this.trainingProgramCurriculumSectionService.getValue(this.id)
      .subscribe((data: TrainingProgramCurriculumSection[]) => {
        if (data) {
          data.sort((a, b) => a.sectionNumber - b.sectionNumber);
          data.forEach( object => {
            this.addCurriculumSectionChild(object.curriculumSectionId, object.id);
          });
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  loadCurriculumTopicTrainingProgram(): void {
    this.curriculumTopicTrainingProgramService.getValue(this.id)
      .subscribe((curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[]) => {
        if (curriculumTopicTrainingPrograms.length !== 0) {
          this.loadCurriculumTopic(curriculumTopicTrainingPrograms);
        }
      });
  }

  loadCurriculumTopic(curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[]): void {
    this.curriculumTopicService.getValue(this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId)
      .subscribe((data: CurriculumTopic[]) => {
        if (data.length !== 0) {
          this.todo = [];
          data.sort((a, b) => b.id - a.id);
          data.forEach((object) => {
            const curriculumTopicTrainingProgram = curriculumTopicTrainingPrograms.find(a => a.curriculumTopicId === object.id);
            if (!curriculumTopicTrainingProgram) {
              this.todo.push({
                first: object.id,
                second: object.topicTitle,
                third: this.curriculumTopicTrainingProgram.isVariable,
                fourth: 0,
                fifth: 1,
                sixth: this.id,
                ninth: object.annotation
              });
            }
          });
        }
      });
  }

  // ADD
  addCurriculumSectionChild(curriculumSectionId: number, trainingProgramCurriculumSectionId: number): void {
    this.curriculumSectionChildren.push({
      done: [],
      curriculumSectionId,
      trainingProgramCurriculumSectionId
    });
  }

  // SAVE FULL
  save(): void {
    this.commonService.saveCurriculumSectionChild$.next(1);
  }

  // DELETE
  deleteTrainingProgramCurriculumSection(index: number, id: number): void {
    this.curriculumSectionChildren.splice(index, 1);
    this.trainingProgramCurriculumSectionService.deleteValue(id).subscribe();
  }
}
