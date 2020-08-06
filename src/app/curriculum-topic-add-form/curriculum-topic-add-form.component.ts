import { Component, OnInit } from '@angular/core';
import {Department} from '../models/Department';
import {Teacher} from '../models/Teacher';
import {TeacherCategory} from '../models/TeacherCategory';
import {TheQuestion} from '../models/TheQuestion';
import {ConsultationTopic} from '../models/ConsultationTopic';
import {MainLiterature} from '../models/MainLiterature';
import {AdditionalLiterature} from '../models/AdditionalLiterature';

@Component({
  selector: 'app-curriculum-topic-add-form',
  templateUrl: './curriculum-topic-add-form.component.html',
  styleUrls: ['./curriculum-topic-add-form.component.scss']
})
export class CurriculumTopicAddFormComponent implements OnInit {
  departments: Department[];
  teachers: Teacher[];
  teacherCategories: TeacherCategory[];
  theQuestions: TheQuestion[];
  consultationTopics: ConsultationTopic[];
  mainLiteratures: MainLiterature[];
  additionalLiteratures: AdditionalLiterature[];

  public departmentsList: any[] = [{}];
  public teachersList: any[] = [{}];
  public teacherCategoriesList: any[] = [{}];
  public theQuestionsList: any[] = [{}];
  public consultationTopicsList: any[] = [{}];
  public mainLiteraturesList: any[] = [{}];
  public additionalLiteraturesList: any[] = [{}];

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  getEditDepartment() {
    this.departments.push({});
  }

  // tslint:disable-next-line:typedef
  getEditTeacher() {
    this.teachers.push({});
  }

  // tslint:disable-next-line:typedef
  getEditTeacherCategory() {
    this.teacherCategories.push({});
  }

  // tslint:disable-next-line:typedef
  getEditTheQuestion() {
    this.theQuestions.push({});
  }

  // tslint:disable-next-line:typedef
  getEditConsultationTopic() {
    this.consultationTopics.push({});
  }

  // tslint:disable-next-line:typedef
  getEditMainLiterature() {
    this.mainLiteratures.push({});
  }

  // tslint:disable-next-line:typedef
  getEditAdditionalLiterature() {
    this.additionalLiteratures.push({});
  }

  // tslint:disable-next-line:typedef
  loadTeachingPosition() {
    this.teachingPositionService.getValues()
      .subscribe((data: Department[]) => {
        this.teachingPositions = data;
      });
  }
}
