import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CurriculumTopic} from '../models/CurriculumTopic';
import {CurriculumTopicService} from '../services/curriculum-topic.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgram} from '../models/TrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {CurriculumSectionService} from '../services/curriculum-section.service';
import {OccupationFormService} from '../services/occupation-form.service';
import {CommonService} from '../common-service/common-service.component';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';

@Component({
  selector: 'app-training-program-add-form',
  templateUrl: './training-program-add-form.component.html',
  styleUrls: ['./training-program-add-form.component.scss'],
  providers: [
    CurriculumTopicService,
    TrainingProgramService,
    CurriculumTopicTrainingProgramService,
    TrainingProgramCurriculumSectionService,
    OccupationFormService,
    CurriculumSectionService
  ]
})

export class TrainingProgramAddFormComponent implements OnInit{
  id: number;
  value: number;
  trainingProgram: TrainingProgram;
  curriculumTopic: CurriculumTopic;

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
  curriculumSectionNumber: number;


  constructor(
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumSectionService: CurriculumSectionService,
    private occupationFormService: OccupationFormService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.trainingProgram = new TrainingProgram();
    this.curriculumSectionNumber = 0;
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  // tslint:disable-next-line:typedef
  drop(event: CdkDragDrop<string[]>) {
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

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
          this.loadCurriculumTopic();
          this.loadTrainingProgramCurriculumSection();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramCurriculumSection() {
    this.trainingProgramCurriculumSectionService.getValue(this.id)
      .subscribe((data: TrainingProgramCurriculumSection[]) => {
        if (data !== undefined){
          this.trainingProgramCurriculumSectionList = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.trainingProgramCurriculumSectionList.sort(function(a, b) {
            return a.sectionNumber - b.sectionNumber;
          });
          this.trainingProgramCurriculumSectionList.forEach( object => {
            this.addCurriculumSection(object.curriculumSectionId, object.id);
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopic() {
    this.curriculumTopicService.getValue(this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId)
      .subscribe((data: CurriculumTopic[]) => {
        if (data.length !== 0){
          this.curriculumTopicList = data;
          this.todo = [];

          this.curriculumTopicList.forEach((object, index) => {
            this.todo.push({
              first: this.curriculumTopicList[index].id,
              second: this.curriculumTopicList[index].topicTitle,
              third: this.curriculumTopicTrainingProgram.isVariable,
              fourth: this.curriculumTopicTrainingProgram.classHours,
              fifth: this.curriculumTopicTrainingProgram.occupationFormId,
              sixth: this.id
            });
          });
          // tslint:disable-next-line:only-arrow-functions typedef
          this.curriculumTopicList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }

  // ADD

  // tslint:disable-next-line:typedef
  addCurriculumSection(curriculumSectionId: number, trainingProgramCurriculumSectionId: number) {
    this.curriculumSectionNumber++;
    this.curriculumSectionContentList.push({
      done: [],
      curriculumSectionNumber: this.curriculumSectionNumber,
      curriculumSectionId,
      trainingProgramCurriculumSectionId
    });

  }

  // SAVE FULL

  // tslint:disable-next-line:typedef
  save() {
    this.commonService.saveCurriculumSectionChild$.next(1);
  }

  // DELETE

  // tslint:disable-next-line:typedef
  deleteTrainingProgramCurriculumSection(index: number) {
    const idx = this.trainingProgramCurriculumSectionList[index - 1].id;
    this.curriculumSectionContentList.splice(index - 1, 1);
    this.trainingProgramCurriculumSectionService.deleteValue(idx)
      .subscribe();
  }
}
