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
import {Globals} from '../globals';

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

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.trainingProgram = new TrainingProgram();
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

  // tslint:disable-next-line:typedef
  noReturnPredicate() {
    return false;
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
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
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram(){
    this.curriculumTopicTrainingProgramService.getValue(this.id)
      .subscribe((data: CurriculumTopicTrainingProgram[]) => {
        if (data !== undefined && data !== null){
          const curriculumTopicTrainingPrograms = data;
          this.loadCurriculumTopic(curriculumTopicTrainingPrograms);
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopic(curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[]) {
    this.curriculumTopicService.getValue(this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId)
      .subscribe((data: CurriculumTopic[]) => {
        if (data.length !== 0){
          this.curriculumTopicList = data;
          this.todo = [];
          // tslint:disable-next-line:only-arrow-functions typedef
          this.curriculumTopicList.sort(function(a, b) {
            return b.id - a.id;
          });

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

    this.curriculumSectionContentList.push({
      done: [],
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
  deleteTrainingProgramCurriculumSection(index: number, id: number) {
    console.log(index, id);
    this.curriculumSectionContentList.splice(index, 1);
    this.trainingProgramCurriculumSectionService.deleteValue(id)
      .subscribe();
  }
}
