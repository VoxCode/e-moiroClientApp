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
import {CurriculumTopicDepartment} from '../models/СurriculumTopicDepartment';
import {CurriculumTopicMainLiterature} from '../models/СurriculumTopicMainLiterature';
import {CurriculumTopicTeacher} from '../models/СurriculumTopicTeacher';
import {CurriculumTopicTeacherCategory} from '../models/СurriculumTopicTeacherCategory';
import {CurriculumTopicTheQuestion} from '../models/СurriculumTopicTheQuestion';
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

  curriculumTopicConsultationTopic: CurriculumTopicConsultationTopic;
  curriculumTopicAdditionalLiterature: CurriculumTopicAdditionalLiterature;
  curriculumTopicDepartment: CurriculumTopicDepartment;
  curriculumTopicMainLiterature: CurriculumTopicMainLiterature;
  curriculumTopicTeacher: CurriculumTopicTeacher;
  curriculumTopicTeacherCategory: CurriculumTopicTeacherCategory;
  curriculumTopicTheQuestion: CurriculumTopicTheQuestion;

  public departmentsList: CurriculumTopicDepartment[] = [{}];
  public teachersList: CurriculumTopicTeacher[] = [{}];
  public teacherCategoriesList: CurriculumTopicTeacherCategory[] = [{}];
  public theQuestionsList: CurriculumTopicTheQuestion[] = [{}];
  public consultationTopicsList: CurriculumTopicConsultationTopic[] = [{}];
  public mainLiteraturesList: CurriculumTopicMainLiterature[] = [{}];
  public additionalLiteraturesList: CurriculumTopicAdditionalLiterature[] = [{}];
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
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadDepartment();
    this.loadTeacher();
    this.loadTheQuestion();
    this.loadTeachingPosition();
    this.loadConsultationTopic();
    this.loadMainLiterature();
    this.loadAdditionalLiterature();
    this.loadCurriculumTopicAdditionalLiterature();
    this.loadCurriculumTopicDepartment();
    this.loadCurriculumTopicMainLiterature();
    this.loadCurriculumTopicTeacher();
    this.loadCurriculumTopicTeacherCategory();
    this.loadCurriculumTopicTheQuestion();
    this.loadCurriculumTopicConsultationTopic();
  }

// ##########ADD#############

  // tslint:disable-next-line:typedef
  addDepartment() {
    this.departmentsList.push({});
  }

  // tslint:disable-next-line:typedef
  addTeacher() {
    this.teachersList.push({});
  }

  // tslint:disable-next-line:typedef
  addTeacherCategory() {
    this.teacherCategoriesList.push({});
  }

  // tslint:disable-next-line:typedef
  addTheQuestion() {
    this.theQuestionsList.push({});
  }

  // tslint:disable-next-line:typedef
  addConsultationTopic() {
    this.consultationTopicsList.push({});
  }

  // tslint:disable-next-line:typedef
  addMainLiterature() {
    this.mainLiteraturesList.push({});
  }

  // tslint:disable-next-line:typedef
  addAdditionalLiterature() {
    this.additionalLiteraturesList.push({});
  }

// ###########REMOVE##############

  // tslint:disable-next-line:typedef
  removeDepartment(i: number, el: number) {
    this.departmentsList.splice(i, 1);
    this.curriculumTopicDepartmentService.deleteValue(el).subscribe();
  }

  // tslint:disable-next-line:typedef
  removeTeacher(i: number, el: number) {
    this.teachersList.splice(i, 1);
    this.curriculumTopicAdditionalLiteratureService.deleteValue(el).subscribe();
  }

  // tslint:disable-next-line:typedef
  removeTeacherCategory(i: number, el: number) {
    this.teacherCategoriesList.splice(i, 1);
    this.curriculumTopicAdditionalLiteratureService.deleteValue(el).subscribe();
  }

  // tslint:disable-next-line:typedef
  removeTheQuestion(i: number, el: number) {
    this.theQuestionsList.splice(i, 1);
    this.curriculumTopicAdditionalLiteratureService.deleteValue(el).subscribe();
  }

  // tslint:disable-next-line:typedef
  removeConsultationTopic(i: number, el: number) {
    this.consultationTopicsList.splice(i, 1);
    this.curriculumTopicAdditionalLiteratureService.deleteValue(el).subscribe();
  }

  // tslint:disable-next-line:typedef
  removeMainLiterature(i: number, el: number) {
    this.mainLiteraturesList.splice(i, 1);
    this.curriculumTopicAdditionalLiteratureService.deleteValue(el).subscribe();
  }

  // tslint:disable-next-line:typedef
  removeAdditionalLiterature(i: number, el: number) {
    this.additionalLiteraturesList.splice(i, 1);
    this.curriculumTopicAdditionalLiteratureService.deleteValue(el).subscribe();
  }


// #######################LOAD###########################

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
    this.curriculumTopicAdditionalLiteratureService.getValue(+this.id)
      .subscribe((data: CurriculumTopicAdditionalLiterature[]) => {
        if (data.length !== 0){
          this.additionalLiteraturesList = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.additionalLiteraturesList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicDepartment() {
    this.curriculumTopicDepartmentService.getValue(+this.id)
      .subscribe((data: CurriculumTopicDepartment[]) => {
        if (data.length !== 0){
          this.departmentsList = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.departmentsList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicMainLiterature() {
    this.curriculumTopicMainLiteratureService.getValue(+this.id)
      .subscribe((data: CurriculumTopicMainLiterature[]) => {
        if (data.length !== 0){
          this.mainLiteraturesList = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.mainLiteraturesList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTeacher() {
    this.curriculumTopicTeacherService.getValue(+this.id)
      .subscribe((data: CurriculumTopicTeacher[]) => {
        if (data.length !== 0){
          this.teachersList = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.teachersList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTeacherCategory() {
    this.curriculumTopicTeacherCategoryService.getValue(+this.id)
      .subscribe((data: CurriculumTopicTeacherCategory[]) => {
        if (data.length !== 0){
          this.teacherCategoriesList = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.teacherCategoriesList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTheQuestion() {
    this.curriculumTopicTheQuestionService.getValue(+this.id)
      .subscribe((data: CurriculumTopicTheQuestion[]) => {
        if (data.length !== 0){
          this.theQuestionsList = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.theQuestionsList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicConsultationTopic() {
    this.curriculumTopicConsultationTopicService.getValue(+this.id)
      .subscribe((data: CurriculumTopicConsultationTopic[]) => {
        if (data.length !== 0){
          this.consultationTopicsList = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.consultationTopicsList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }


// ######################POST#########################

  // tslint:disable-next-line:typedef
  postCurriculumTopicAdditionalLiterature() {
    this.curriculumTopicAdditionalLiteratureService.createValue(this.curriculumTopicAdditionalLiterature)
      .subscribe((data: CurriculumTopicAdditionalLiterature) => {
        this.curriculumTopicAdditionalLiterature = data;
        const tmpObject = this.additionalLiteraturesList.find(a => a.additionalLiteratureId === undefined);
        const index = this.additionalLiteraturesList.indexOf(tmpObject);
        this.additionalLiteraturesList[index].id = this.curriculumTopicAdditionalLiterature.id;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicDepartment() {
    this.curriculumTopicDepartmentService.createValue(this.curriculumTopicDepartment)
      .subscribe((data: CurriculumTopicDepartment) => {
        this.curriculumTopicDepartment = data;
        const tmpObject = this.departmentsList.find(a => a.departmentId === undefined);
        const index = this.departmentsList.indexOf(tmpObject);
        this.departmentsList[index].id = this.curriculumTopicDepartment.id;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicMainLiterature() {
    this.curriculumTopicMainLiteratureService.createValue(this.curriculumTopicMainLiterature)
      .subscribe((data: CurriculumTopicMainLiterature) => {
        this.curriculumTopicMainLiterature = data;
        const tmpObject = this.mainLiteraturesList.find(a => a.mainLiteratureId === undefined);
        const index = this.mainLiteraturesList.indexOf(tmpObject);
        this.mainLiteraturesList[index].id = this.curriculumTopicMainLiterature.id;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicTeacher() {
    this.curriculumTopicTeacherService.createValue(this.curriculumTopicTeacher)
      .subscribe((data: CurriculumTopicTeacher) => {
        this.curriculumTopicTeacher = data;
        const tmpObject = this.teachersList.find(a => a.teacherId === undefined);
        const index = this.teachersList.indexOf(tmpObject);
        this.teachersList[index].id = this.curriculumTopicTeacher.id;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicTeacherCategory() {
    this.curriculumTopicTeacherCategoryService.createValue(this.curriculumTopicTeacherCategory)
      .subscribe((data: CurriculumTopicTeacherCategory) => {
        this.curriculumTopicTeacherCategory = data;
        const tmpObject = this.teacherCategoriesList.find(a => a.teacherCategoryId === undefined);
        const index = this.teacherCategoriesList.indexOf(tmpObject);
        this.teacherCategoriesList[index].id = this.curriculumTopicTeacherCategory.id;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicTheQuestion() {
    this.curriculumTopicTheQuestionService.createValue(this.curriculumTopicTheQuestion)
      .subscribe((data: CurriculumTopicTheQuestion) => {
        this.curriculumTopicTheQuestion = data;
        const tmpObject = this.theQuestionsList.find(a => a.theQuestionId === undefined);
        const index = this.theQuestionsList.indexOf(tmpObject);
        this.theQuestionsList[index].id = this.curriculumTopicTheQuestion.id;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicConsultationTopic() {
    this.curriculumTopicConsultationTopicService.createValue(this.curriculumTopicConsultationTopic)
      .subscribe((data: CurriculumTopicConsultationTopic) => {
        this.curriculumTopicConsultationTopic = data;
        const tmpObject = this.consultationTopicsList.find(a => a.consultationTopicId === undefined);
        const index = this.consultationTopicsList.indexOf(tmpObject);
        this.consultationTopicsList[index].id = this.curriculumTopicConsultationTopic.id;
      });
  }


// ##############UPDATE###############

  // tslint:disable-next-line:typedef
  updateCurriculumTopicAdditionalLiterature() {
    this.curriculumTopicAdditionalLiteratureService.updateValue(this.curriculumTopicAdditionalLiterature)
      .subscribe((data: CurriculumTopicAdditionalLiterature) => {
        this.curriculumTopicAdditionalLiterature = data;
      });
  }

  // tslint:disable-next-line:typedef
  updateCurriculumTopicDepartment() {
    this.curriculumTopicDepartmentService.updateValue(this.curriculumTopicDepartment)
      .subscribe((data: CurriculumTopicDepartment) => {
        this.curriculumTopicDepartment = data;
      });
  }

  // tslint:disable-next-line:typedef
  updateCurriculumTopicMainLiterature() {
    this.curriculumTopicMainLiteratureService.updateValue(this.curriculumTopicMainLiterature)
      .subscribe((data: CurriculumTopicMainLiterature) => {
        this.curriculumTopicMainLiterature = data;
      });
  }

  // tslint:disable-next-line:typedef
  updateCurriculumTopicTeacher() {
    this.curriculumTopicTeacherService.updateValue(this.curriculumTopicTeacher)
      .subscribe((data: CurriculumTopicTeacher) => {
        this.curriculumTopicTeacher = data;
      });
  }

  // tslint:disable-next-line:typedef
  updateCurriculumTopicTeacherCategory() {
    this.curriculumTopicTeacherCategoryService.updateValue(this.curriculumTopicTeacherCategory)
      .subscribe((data: CurriculumTopicTeacherCategory) => {
        this.curriculumTopicTeacherCategory = data;
      });
  }

  // tslint:disable-next-line:typedef
  updateCurriculumTopicTheQuestion() {
    this.curriculumTopicTheQuestionService.updateValue(this.curriculumTopicTheQuestion)
      .subscribe((data: CurriculumTopicTheQuestion) => {
        this.curriculumTopicTheQuestion = data;
      });
  }

  // tslint:disable-next-line:typedef
  updateCurriculumTopicConsultationTopic() {
    this.curriculumTopicConsultationTopicService.updateValue(this.curriculumTopicConsultationTopic)
      .subscribe((data: CurriculumTopicConsultationTopic) => {
        this.curriculumTopicConsultationTopic = data;
      });
  }

// ###########CHANGE#############

  // tslint:disable-next-line:typedef
  changeAdditionalLiterature($event: any, el: CurriculumTopicAdditionalLiterature) {
    this.curriculumTopicAdditionalLiterature = new CurriculumTopicAdditionalLiterature();
    this.curriculumTopicAdditionalLiterature.additionalLiteratureId = +$event;
    this.curriculumTopicAdditionalLiterature.curriculumTopicId = +this.id;

    if (el.id !== undefined){
      this.curriculumTopicAdditionalLiterature.id = el.id;
      this.updateCurriculumTopicAdditionalLiterature();
    }
    else {
      this.postCurriculumTopicAdditionalLiterature();
    }
  }

  // tslint:disable-next-line:typedef
  changeDepartment($event: any, el: CurriculumTopicDepartment) {
    this.curriculumTopicDepartment = new CurriculumTopicDepartment();
    this.curriculumTopicDepartment.departmentId = +$event;
    this.curriculumTopicDepartment.curriculumTopicId = +this.id;
    if (el.id !== undefined){
      this.curriculumTopicDepartment.id = el.id;
      this.updateCurriculumTopicDepartment();
    }
    else {
      this.postCurriculumTopicDepartment();
    }
  }

  // tslint:disable-next-line:typedef
  changeMainLiterature($event: any, el: CurriculumTopicMainLiterature) {
    this.curriculumTopicMainLiterature = new CurriculumTopicMainLiterature();
    this.curriculumTopicMainLiterature.mainLiteratureId = +$event;
    this.curriculumTopicMainLiterature.curriculumTopicId = +this.id;

    if (el.id !== undefined){
      this.curriculumTopicMainLiterature.id = el.id;
      this.updateCurriculumTopicMainLiterature();
    }
    else {
      this.postCurriculumTopicMainLiterature();
    }
  }

  // tslint:disable-next-line:typedef
  changeTeacher($event: any, el: CurriculumTopicTeacher) {
    this.curriculumTopicTeacher = new CurriculumTopicTeacher();
    this.curriculumTopicTeacher.teacherId = +$event;
    this.curriculumTopicTeacher.curriculumTopicId = +this.id;

    if (el.id !== undefined){
      this.curriculumTopicTeacher.id = el.id;
      this.updateCurriculumTopicTeacher();
    }
    else {
      this.postCurriculumTopicTeacher();
    }
  }

  // tslint:disable-next-line:typedef
  changeTeacherCategory($event: any, el: CurriculumTopicTeacherCategory) {
    this.curriculumTopicTeacherCategory = new CurriculumTopicTeacherCategory();
    this.curriculumTopicTeacherCategory.teacherCategoryId = +$event;
    this.curriculumTopicTeacherCategory.curriculumTopicId = +this.id;

    if (el.id !== undefined){
      this.curriculumTopicTeacherCategory.id = el.id;
      this.updateCurriculumTopicTeacherCategory();
    }
    else {
      this.postCurriculumTopicTeacherCategory();
    }
  }

  // tslint:disable-next-line:typedef
  changeTheQuestion($event: any, el: CurriculumTopicTheQuestion) {
    this.curriculumTopicTheQuestion = new CurriculumTopicTheQuestion();
    this.curriculumTopicTheQuestion.theQuestionId = +$event;
    this.curriculumTopicTheQuestion.curriculumTopicId = +this.id;

    if (el.id !== undefined){
      this.curriculumTopicTheQuestion.id = el.id;
      this.updateCurriculumTopicTheQuestion();
    }
    else {
      this.postCurriculumTopicTheQuestion();
    }
  }

  // tslint:disable-next-line:typedef
  changeConsultationTopic($event: any, el: CurriculumTopicConsultationTopic) {
    this.curriculumTopicConsultationTopic = new CurriculumTopicConsultationTopic();
    this.curriculumTopicConsultationTopic.consultationTopicId = +$event;
    this.curriculumTopicConsultationTopic.curriculumTopicId = +this.id;

    if (el.id !== undefined){
      this.curriculumTopicConsultationTopic.id = el.id;
      this.updateCurriculumTopicConsultationTopic();
    }
    else {
      this.postCurriculumTopicConsultationTopic();
    }
  }
}
