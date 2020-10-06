import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CurriculumTopic} from '../models/CurriculumTopic';
import {CurriculumTopicService} from '../services/curriculum-topic.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgram} from '../models/TrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';

@Component({
  selector: 'app-training-program-add-form',
  templateUrl: './training-program-add-form.component.html',
  styleUrls: ['./training-program-add-form.component.scss'],
  providers: [
    CurriculumTopicService,
    TrainingProgramService,
    CurriculumTopicTrainingProgramService
  ]
})

export class TrainingProgramAddFormComponent implements OnInit{
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopic: CurriculumTopic;
  curriculumTopicList: CurriculumTopic[] = [{}];
  curriculumTopicTmpList: CurriculumTopic[];
  curriculumTopicTrainingProgramList: CurriculumTopicTrainingProgram[] = [{}];
  todo = [];
  done = [];

  constructor(
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
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
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopic() {
    this.curriculumTopicService.getValue(this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId)
      .subscribe((data: CurriculumTopic[]) => {
        if (data.length !== 0){
          this.curriculumTopicList = data;
          this.todo = this.curriculumTopicList;
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

          this.curriculumTopicTrainingProgramList.forEach((object, index) => {
            const tmp = this.curriculumTopicList.find(c => c.id === this.curriculumTopicTrainingProgramList[index].curriculumTopicId);
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
    this.done.forEach((object, index) => {
      // this.curriculumTopicTrainingProgramList.push({ curriculumTopicId: this.done[index].});
    });

    this.curriculumTopicTmpList = this.done;
    this.curriculumTopicTrainingProgramList = this.done;

    console.log(this.curriculumTopicTrainingProgramList);

    this.curriculumTopicTrainingProgramList.forEach((object, index) => {
      this.curriculumTopicTrainingProgramService.createValue(this.curriculumTopicTrainingProgramList[index])
        .subscribe((data: CurriculumTopicTrainingProgram) => {

        });
    });
  }
}
