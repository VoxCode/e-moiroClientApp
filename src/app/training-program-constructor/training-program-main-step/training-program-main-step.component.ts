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

  curriculumTopicList: CurriculumTopic[] = [];
  trainingProgramCurriculumSectionList: TrainingProgramCurriculumSection[] = [];
  curriculumSectionContentList = [];
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
        if (data){
          this.trainingProgram = data;
          this.loadTrainingProgramCurriculumSection();
        }
      });
  }

  loadTrainingProgramCurriculumSection(): void {
    this.trainingProgramCurriculumSectionService.getValue(this.id)
      .subscribe((data: TrainingProgramCurriculumSection[]) => {
        if (data !== undefined){
          this.trainingProgramCurriculumSectionList = data;
          this.trainingProgramCurriculumSectionList.sort((a, b) => a.sectionNumber - b.sectionNumber);
          this.trainingProgramCurriculumSectionList.forEach( object => {
            this.addCurriculumSection(object.curriculumSectionId, object.id);
          });
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  loadCurriculumTopicTrainingProgram(): void {
    this.curriculumTopicTrainingProgramService.getValue(this.id)
      .subscribe((data: CurriculumTopicTrainingProgram[]) => {
        if (data !== undefined && data !== null){
          this.loadCurriculumTopic(data);
        }
      });
  }

  loadCurriculumTopic(curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[]): void {
    this.curriculumTopicService.getValue(this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId)
      .subscribe((data: CurriculumTopic[]) => {
        if (data.length !== 0){
          this.curriculumTopicList = data;
          this.todo = [];
          this.curriculumTopicList.sort((a, b) => b.id - a.id);
          this.curriculumTopicList.forEach((object, index) => {
            const tmp2 = curriculumTopicTrainingPrograms.find(a => a.curriculumTopicId === object.id);
            if (tmp2 === undefined) {
              this.todo.push({
                first: this.curriculumTopicList[index].id,
                second: this.curriculumTopicList[index].topicTitle,
                third: this.curriculumTopicTrainingProgram.isVariable,
                fourth: 0,
                fifth: 1,
                sixth: this.id,
                ninth: object.annotation
              });
            }
          });
          this.curriculumTopicList.sort((a, b) => a.id - b.id);
        }
      });
  }

  // ADD
  addCurriculumSection(curriculumSectionId: number, trainingProgramCurriculumSectionId: number): void {
    this.curriculumSectionContentList.push({
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
    this.curriculumSectionContentList.splice(index, 1);
    this.trainingProgramCurriculumSectionService.deleteValue(id).subscribe();
  }
}
