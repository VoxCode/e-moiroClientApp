import { Component, OnInit } from '@angular/core';
import {Department} from '../models/Department';
import {Teacher} from '../models/Teacher';
import {TeacherCategory} from '../models/TeacherCategory';
import {TheQuestion} from '../models/TheQuestion';
import {ConsultationTopic} from '../models/ConsultationTopic';
import {MainLiterature} from '../models/MainLiterature';
import {AdditionalLiterature} from '../models/AdditionalLiterature';
import {DepartmentService} from '../services/department.service';
import {TeacherService} from '../services/teacher.service';
import {TeacherCategoryService} from '../services/teacher-category.service';
import {TheQuestionService} from '../services/the-question.service';
import {ConsultationTopicService} from '../services/consultation-topic.service';
import {MainLiteratureService} from '../services/main-literature.service';
import {AdditionalLiteratureService} from '../services/additional-literature.service';
import {CurriculumTopicAdditionalLiteratureService} from '../services/curriculum-topic-additional-literature.service';
import {CurriculumTopicDepartmentService} from '../services/curriculum-topic-department.service';
import {CurriculumTopicMainLiteratureService} from '../services/curriculum-topic-main-literature.service';
import {CurriculumTopicTeacherService} from '../services/curriculum-topic-teacher.service';
import {CurriculumTopicTeacherCategoryService} from '../services/curriculum-topic-teacher-category.service';
import {CurriculumTopicTheQuestionService} from '../services/curriculum-topic-the-question.service';
import {CurriculmTopicConsultationTopicService} from '../services/curriculm-topic-consultation-topic.service';
import {CurriculumTopicAdditionalLiterature} from '../models/СurriculumTopicAdditionalLiterature';
import {CurriculumTopicConsultationTopic} from '../models/СurriculumTopicConsultationTopic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curriculum-topic-add-form',
  templateUrl: './curriculum-topic-add-form.component.html',
  styleUrls: ['./curriculum-topic-add-form.component.scss'],
  providers: [
    DepartmentService,
    TeacherService,
    TeacherCategoryService,
    TheQuestionService,
    ConsultationTopicService,
    MainLiteratureService,
    AdditionalLiteratureService,
    CurriculumTopicAdditionalLiteratureService,
    CurriculumTopicDepartmentService,
    CurriculumTopicMainLiteratureService,
    CurriculumTopicTeacherService,
    CurriculumTopicTeacherCategoryService,
    CurriculumTopicTheQuestionService,
    CurriculmTopicConsultationTopicService ]
})
export class CurriculumTopicAddFormComponent implements OnInit {
  departments: Department[];
  teachers: Teacher[];
  teacherCategories: TeacherCategory[];
  theQuestions: TheQuestion[];
  consultationTopics: ConsultationTopic[];
  mainLiteratures: MainLiterature[];
  additionalLiteratures: AdditionalLiterature[];
  curriculumTopicConsultationTopics: CurriculumTopicConsultationTopic[];
  curriculumTopicAdditionalLiteratures: CurriculumTopicAdditionalLiterature[];

  curriculumTopicConsultationTopic: CurriculumTopicConsultationTopic;
  curriculumTopicAdditionalLiterature: CurriculumTopicAdditionalLiterature;

  public departmentsList: any[] = [{}];
  public teachersList: any[] = [{}];
  public teacherCategoriesList: any[] = [{}];
  public theQuestionsList: any[] = [{}];
  public consultationTopicsList: any[] = [{}];
  public mainLiteraturesList: any[] = [{}];
  public additionalLiteraturesList: any[] = [{}];
  private id: number;

  constructor(
    private departmentService: DepartmentService,
    private teacherService: TeacherService,
    private teacherCategoryService: TeacherCategoryService,
    private theQuestionService: TheQuestionService,
    private consultationTopicService: ConsultationTopicService,
    private mainLiteratureService: MainLiteratureService,
    private additionalLiteratureService: AdditionalLiteratureService,
    private curriculumTopicAdditionalLiteratureService: CurriculumTopicAdditionalLiteratureService,
    private curriculumTopicDepartmentService: CurriculumTopicDepartmentService,
    private curriculumTopicMainLiteratureService: CurriculumTopicMainLiteratureService,
    private curriculumTopicTeacherService: CurriculumTopicTeacherService,
    private curriculumTopicTeacherCategoryService: CurriculumTopicTeacherCategoryService,
    private curriculumTopicTheQuestionService: CurriculumTopicTheQuestionService,
    private curriculumTopicConsultationTopicService: CurriculmTopicConsultationTopicService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadDepartment();
    this.loadTeacher();
    this.loadTheQuestion();
    this.loadTeachingPosition();
    this.loadConsultationTopic();
    this.loadMainLiterature();
    this.loadAdditionalLiterature();
    this.loadCurriculumTopicAdditionalLiterature();

    this.id = this.route.snapshot.params.id;
    console.log(this.id);
  }

  // tslint:disable-next-line:typedef
  getEditDepartment() {
    this.departmentsList.push({});
  }

  // tslint:disable-next-line:typedef
  getEditTeacher() {
    this.teachersList.push({});
  }

  // tslint:disable-next-line:typedef
  getEditTeacherCategory() {
    this.teacherCategoriesList.push({});
  }

  // tslint:disable-next-line:typedef
  getEditTheQuestion() {
    this.theQuestionsList.push({});
  }

  // tslint:disable-next-line:typedef
  getEditConsultationTopic() {
    this.consultationTopicsList.push({});
  }

  // tslint:disable-next-line:typedef
  getEditMainLiterature() {
    this.mainLiteraturesList.push({});
  }

  // tslint:disable-next-line:typedef
  getEditAdditionalLiterature() {
    this.additionalLiteraturesList.push({});
  }

  // tslint:disable-next-line:typedef
  removeDepartment(i: number) {
    this.departmentsList.splice(i, 1);
  }

  // tslint:disable-next-line:typedef
  removeTeacher(i: number) {
    this.teachersList.splice(i, 1);
  }

  // tslint:disable-next-line:typedef
  removeTeacherCategory(i: number) {
    this.teacherCategoriesList.splice(i, 1);
  }

  // tslint:disable-next-line:typedef
  removeTheQuestion(i: number) {
    this.theQuestionsList.splice(i, 1);
  }

  // tslint:disable-next-line:typedef
  removeConsultationTopic(i: number) {
    this.consultationTopicsList.splice(i, 1);
  }

  // tslint:disable-next-line:typedef
  removeMainLiterature(i: number) {
    this.mainLiteraturesList.splice(i, 1);
  }

  // tslint:disable-next-line:typedef
  removeAdditionalLiterature(i: number) {
    this.additionalLiteraturesList.splice(i, 1);
  }


  // tslint:disable-next-line:typedef
  loadDepartment() {
    this.departmentService.getValues()
      .subscribe((data: Department[]) => {
        this.departments = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadTeacher() {
    this.teacherService.getValues()
      .subscribe((data: Teacher[]) => {
        this.teachers = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadTheQuestion() {
    this.teacherCategoryService.getValues()
      .subscribe((data: TeacherCategory[]) => {
        this.teacherCategories = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadTeachingPosition() {
    this.theQuestionService.getValues()
      .subscribe((data: TheQuestion[]) => {
        this.theQuestions = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadConsultationTopic() {
    this.consultationTopicService.getValues()
      .subscribe((data: ConsultationTopic[]) => {
        this.consultationTopics = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadMainLiterature() {
    this.mainLiteratureService.getValues()
      .subscribe((data: MainLiterature[]) => {
        this.mainLiteratures = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadAdditionalLiterature() {
    this.additionalLiteratureService.getValues()
      .subscribe((data: AdditionalLiterature[]) => {
        this.additionalLiteratures = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicAdditionalLiterature() {
    this.curriculumTopicAdditionalLiteratureService.getValues()
      .subscribe((data: CurriculumTopicAdditionalLiterature[]) => {
        this.curriculumTopicAdditionalLiteratures = data;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicAdditionalLiterature() {
    this.curriculumTopicAdditionalLiteratureService.createValue(this.curriculumTopicAdditionalLiterature)
      .subscribe((data: CurriculumTopicAdditionalLiterature) => {
        this.curriculumTopicAdditionalLiterature = data;
      });
  }


  changeAdditionalLiterature(p: AdditionalLiterature) {

  }


}
