import { Component, OnInit } from '@angular/core';
import {TrainingProgram} from '../../models/TrainingProgram';
import {Globals} from '../../globals';
import {TrainingProgramService} from '../../services/training-program.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramTeacher} from '../../models/TrainingProgramTeacher';
import {TrainingProgramTeacherService} from '../../services/training-program-teacher.service';
import {Teacher} from '../../models/Teacher';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-training-program-expert-step',
  templateUrl: './training-program-expert-step.component.html',
  styleUrls: ['./training-program-expert-step.component.scss'],
  providers: [
    TrainingProgramService,
    TrainingProgramTeacherService,
    TeacherService,
  ]
})

export class TrainingProgramExpertStepComponent implements OnInit {

  id: number;
  trainingProgram: TrainingProgram;
  trainingProgramTeacherDeveloper: TrainingProgramTeacher[] = [{}];
  trainingProgramTeacherReviewer: TrainingProgramTeacher[] = [{}];
  teacherDevelopers: Teacher[] = [];
  teacherReviewers: Teacher[] = [];
  teachers: Teacher[] = [];

  constructor(
    public globals: Globals,
    private trainingProgramService: TrainingProgramService,
    private trainingProgramTeacherService: TrainingProgramTeacherService,
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  loadTrainingProgram(): void {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        this.trainingProgram = data;
        this.loadTeacher();
      });
  }

  loadTeacher(): void {
    this.teacherService.getValues()
      .subscribe((teachers: Teacher[]) => {
        teachers.forEach((teacher: Teacher) => {
          teacher.fullNameForm = teacher.lastName + ' ' + teacher.firstName + ' ' +
            teacher.patronymicName + ' (' + teacher.academicRank + ')';
          this.teachers.push(teacher);
        });
        this.loadTrainingProgramTeacher();
      });
  }

  loadTrainingProgramTeacher(): void {
    this.trainingProgramTeacherService.getValuesFromTrainingProgram(this.id)
      .subscribe((data: TrainingProgramTeacher[]) => {
        if (data.length !== 0) {
          this.trainingProgramTeacherDeveloper = data.filter(a => a.expertId === 1);
          this.trainingProgramTeacherReviewer = data.filter(a => a.expertId === 2);

          if (this.trainingProgramTeacherDeveloper.length !== 0) {
            this.trainingProgramTeacherDeveloper.forEach((obj) => {
              this.teacherDevelopers.push(this.teachers.find(a => a.id === obj.teacherId));
            });
          }
          else {
            this.trainingProgramTeacherDeveloper = [{}];
          }
          if (this.trainingProgramTeacherReviewer.length !== 0) {
            this.trainingProgramTeacherReviewer.forEach((obj) => {
              this.teacherReviewers.push(this.teachers.find(a => a.id === obj.teacherId));
            });
          }
          else {
            this.trainingProgramTeacherReviewer = [{}];
          }
        }
      });
  }

  addDeveloper(): void {
    this.trainingProgramTeacherDeveloper.push({});
  }

  addReviewer(): void {
    this.trainingProgramTeacherReviewer.push({});
  }

  removeDeveloper(i: number, id: number): void {
    this.trainingProgramTeacherDeveloper.splice(i, 1);
    this.trainingProgramTeacherService.deleteValue(id).subscribe();
  }

  removeReviewer(i: number, id: number): void {
    this.trainingProgramTeacherReviewer.splice(i, 1);
    this.trainingProgramTeacherService.deleteValue(id).subscribe();
  }

  saveDeveloper(teacherId: number, index: number): void {
    const expertId = 1;
    if (!this.trainingProgramTeacherDeveloper[index].id) {
      this.create(teacherId, expertId, index);
    }
    else {
      this.update(teacherId, expertId, index);
    }
  }

  saveReviewer(teacherId: number, index: number): void {
    const expertId = 2;
    if (!this.trainingProgramTeacherReviewer[index].id) {
      this.create(teacherId, expertId, index);
    }
    else {
      this.update(teacherId, expertId, index);
    }
  }

  create(teacherId: number, expertId: number, index: number): void {
    const trainingProgramTeacher = new TrainingProgramTeacher();
    trainingProgramTeacher.expertId = expertId;
    trainingProgramTeacher.trainingProgramId = this.id;
    trainingProgramTeacher.teacherId = teacherId;
    this.trainingProgramTeacherService.createValue(trainingProgramTeacher)
      .subscribe((trainingProgramTeacherResponse: TrainingProgramTeacher) => {
        console.log('Create was successful!');
        if (expertId === 1) {
        this.trainingProgramTeacherDeveloper[index] = trainingProgramTeacherResponse;
      }
      else if (expertId === 2) {
        this.trainingProgramTeacherReviewer[index] = trainingProgramTeacherResponse;
      }
    });
  }

  update(teacherId: number, expertId: number, index: number): void {
    let trainingProgramTeacher: TrainingProgramTeacher;
    if (expertId === 1) {
      trainingProgramTeacher = this.trainingProgramTeacherDeveloper[index];
      trainingProgramTeacher.teacherId = teacherId;
    }
    else if (expertId === 2) {
      trainingProgramTeacher = this.trainingProgramTeacherReviewer[index];
      trainingProgramTeacher.teacherId = teacherId;
    }
    if (trainingProgramTeacher) {
      this.trainingProgramTeacherService.updateValue(trainingProgramTeacher).subscribe(() => {
        console.log('Update was successful!');
      });
    }
  }
}
