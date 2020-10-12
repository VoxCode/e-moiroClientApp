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
import {CurriculumSection} from '../models/CurriculumSection';

@Component({
  selector: 'app-training-program-add-form',
  templateUrl: './training-program-add-form.component.html',
  styleUrls: ['./training-program-add-form.component.scss'],
  providers: [
    CurriculumTopicService,
    TrainingProgramService,
    CurriculumTopicTrainingProgramService,
    OccupationFormService,
    CurriculumSectionService,
  ]
})

export class TrainingProgramAddFormComponent implements OnInit{
  id: number;

  trainingProgram: TrainingProgram;
  curriculumTopic: CurriculumTopic;
  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram = {
    isVariable: false,
    classHours: 0,
    occupationFormId: 0
  };

  curriculumSections: CurriculumSection[] = [];
  curriculumTopicList: CurriculumTopic[] = [];
  curriculumTopicTmpList: CurriculumTopic[] = [];
  curriculumTopicTrainingProgramList: CurriculumTopicTrainingProgram[] = [];
  curriculumSectionContentList = [];
  todo = [];
  done = [];
  name: string;
  i = 1;


  constructor(
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumSectionService: CurriculumSectionService,
    private occupationFormService: OccupationFormService,
    private route: ActivatedRoute
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
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
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
          this.loadCurriculumTopic();
          // this.loadCurriculumTopicTrainingProgram();

        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumSection(){
    this.curriculumSectionService.getValue(this.id)
      .subscribe((data: CurriculumSection[]) => {
        if (data !== undefined){
          this.curriculumSections = data;
        }
      });
  }



  // tslint:disable-next-line:typedef
  loadCurriculumTopic() {
    this.curriculumTopicService.getValue(this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId)
      .subscribe((data: CurriculumTopic[]) => {
        if (data.length !== 0){
          this.curriculumTopicList = data;

          this.curriculumTopicList.forEach((object, index) => {
            this.todo.push({
              first: this.curriculumTopicList[index].id,
              second: this.curriculumTopicList[index].topicTitle,
              third: this.curriculumTopicTrainingProgram.isVariable,
              fourth: this.curriculumTopicTrainingProgram.classHours,
              fifth: this.curriculumTopicTrainingProgram.occupationFormId
            });
          });
          // tslint:disable-next-line:only-arrow-functions typedef
          this.curriculumTopicList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram() {
    this.curriculumTopicTrainingProgramService.getValue(this.id)
      .subscribe((data: CurriculumTopicTrainingProgram[]) => {
        if (data.length !== 0){
          this.curriculumTopicTrainingProgramList = data;

          this.done = this.curriculumTopicTrainingProgramList;

          this.curriculumTopicTrainingProgramList
            .forEach((object, index) => {
            const tmp = this.curriculumTopicList.
            find(c => c.id === this.curriculumTopicTrainingProgramList[index].curriculumTopicId);
            if (tmp !== undefined) {
              this.curriculumTopicList.splice( this.curriculumTopicList.indexOf(tmp), 1);
              this.curriculumTopicTmpList.push({});
            }

          });
          // tslint:disable-next-line:only-arrow-functions typedef
          this.curriculumTopicTrainingProgramList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  crate(){
    this.curriculumSectionContentList[0].done.forEach((object, index) => {
      // tslint:disable-next-line:max-line-length
      // this.curriculumTopicTrainingProgramList.push({ curriculumTopicId: this.done2[index].id, isVariable: this.done2[index].isVariable });
    });

    this.curriculumTopicTmpList = this.curriculumSectionContentList[0].done;
    // this.curriculumTopicTrainingProgramList
    // console.log(this.done);

    console.log(this.curriculumSectionContentList[0].done[0].second +
      '======' + this.curriculumSectionContentList[0].done[0].fifth
      + '======' + this.curriculumSectionContentList[0].done[0].fifth);
   // console.log(this.curriculumTopicTrainingProgramList);

    this.curriculumTopicTrainingProgramList.forEach((object, index) => {
      // this.curriculumTopicTrainingProgramService.createValue(this.curriculumTopicTrainingProgramList[index])
        // .subscribe((data: CurriculumTopicTrainingProgram) => {
       // });
    });
  }

  // tslint:disable-next-line:typedef
  addCurriculumSection() {
    this.curriculumSectionContentList.push({
      done: [], name: 'Раздел ' + this.i
    });
    this.i++;
  }
}

