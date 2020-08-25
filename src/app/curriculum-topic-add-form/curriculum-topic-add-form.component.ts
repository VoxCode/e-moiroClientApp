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

  curriculumTopicConsultationTopics: CurriculumTopicConsultationTopic[];
  curriculumTopicAdditionalLiteratures: CurriculumTopicAdditionalLiterature[];
  curriculumTopicDepartments: CurriculumTopicDepartment[];
  curriculumTopicMainLiteratures: CurriculumTopicMainLiterature[];
  curriculumTopicTeachers: CurriculumTopicTeacher[];
  curriculumTopicTeacherCategories: CurriculumTopicTeacherCategory[];
  curriculumTopicTheQuestions: CurriculumTopicTheQuestion[];

  curriculumTopicConsultationTopic: CurriculumTopicConsultationTopic;
  curriculumTopicAdditionalLiterature: CurriculumTopicAdditionalLiterature;
  curriculumTopicDepartment: CurriculumTopicDepartment;
  curriculumTopicMainLiterature: CurriculumTopicMainLiterature;
  curriculumTopicTeacher: CurriculumTopicTeacher;
  curriculumTopicTeacherCategory: CurriculumTopicTeacherCategory;
  curriculumTopicTheQuestion: CurriculumTopicTheQuestion;

  public departmentsList: any[] = [{}];
  public teachersList: any[] = [{}];
  public teacherCategoriesList: any[] = [{}];
  public theQuestionsList: any[] = [{}];
  public consultationTopicsList: any[] = [{}];
  public mainLiteraturesList: any[] = [{}];
  public additionalLiteraturesList: CurriculumTopicAdditionalLiterature[] = [{}];
  private id: number;
  private tmp: AdditionalLiterature;

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
    // this.loadCurriculumTopicDepartment();
    // this.loadCurriculumTopicMainLiterature();
    // this.loadCurriculumTopicTeacher();
    // this.loadCurriculumTopicTeacherCategory();
    // this.loadCurriculumTopicTheQuestion();
    // this.loadCurriculumTopicConsultationTopic();
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
    this.curriculumTopicAdditionalLiteratureService.getValues()
      .subscribe((data: CurriculumTopicAdditionalLiterature[]) => {
        this.curriculumTopicAdditionalLiteratures = data;

        if (this.curriculumTopicAdditionalLiteratures !== null){
          this.additionalLiteraturesList = data;

          console.log(data);
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicDepartment() {
    this.curriculumTopicDepartmentService.getValues()
      .subscribe((data: CurriculumTopicDepartment[]) => {
        this.curriculumTopicDepartments = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicMainLiterature() {
    this.curriculumTopicMainLiteratureService.getValues()
      .subscribe((data: CurriculumTopicMainLiterature[]) => {
        this.curriculumTopicMainLiteratures = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTeacher() {
    this.curriculumTopicTeacherService.getValues()
      .subscribe((data: CurriculumTopicTeacher[]) => {
        this.curriculumTopicTeachers = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTeacherCategory() {
    this.curriculumTopicTeacherCategoryService.getValues()
      .subscribe((data: CurriculumTopicTeacherCategory[]) => {
        this.curriculumTopicTeacherCategories = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTheQuestion() {
    this.curriculumTopicTheQuestionService.getValues()
      .subscribe((data: CurriculumTopicTheQuestion[]) => {
        this.curriculumTopicTheQuestions = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicConsultationTopic() {
    this.curriculumTopicConsultationTopicService.getValues()
      .subscribe((data: CurriculumTopicConsultationTopic[]) => {
        this.curriculumTopicConsultationTopics = data;
      });
  }


// ######################POST#########################

  // tslint:disable-next-line:typedef
  postCurriculumTopicAdditionalLiterature() {
    this.curriculumTopicAdditionalLiteratureService.createValue(this.curriculumTopicAdditionalLiterature)
      .subscribe((data: CurriculumTopicAdditionalLiterature) => {
        this.curriculumTopicAdditionalLiterature = data;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicDepartment() {
    this.curriculumTopicDepartmentService.createValue(this.curriculumTopicDepartment)
      .subscribe((data: CurriculumTopicDepartment) => {
        this.curriculumTopicDepartment = data;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicMainLiterature() {
    this.curriculumTopicMainLiteratureService.createValue(this.curriculumTopicMainLiterature)
      .subscribe((data: CurriculumTopicMainLiterature) => {
        this.curriculumTopicMainLiterature = data;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicTeacher() {
    this.curriculumTopicTeacherService.createValue(this.curriculumTopicTeacher)
      .subscribe((data: CurriculumTopicTeacher) => {
        this.curriculumTopicTeacher = data;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicTeacherCategory() {
    this.curriculumTopicTeacherCategoryService.createValue(this.curriculumTopicTeacherCategory)
      .subscribe((data: CurriculumTopicTeacherCategory) => {
        this.curriculumTopicTeacherCategory = data;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicTheQuestion() {
    this.curriculumTopicTheQuestionService.createValue(this.curriculumTopicTheQuestion)
      .subscribe((data: CurriculumTopicTheQuestion) => {
        this.curriculumTopicTheQuestion = data;
      });
  }

  // tslint:disable-next-line:typedef
  postCurriculumTopicConsultationTopic() {
    this.curriculumTopicConsultationTopicService.createValue(this.curriculumTopicConsultationTopic)
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
    console.log($event, this.curriculumTopicAdditionalLiterature);
    if (el.id !== undefined){

    }
    else {
      this.postCurriculumTopicAdditionalLiterature();
    }
  }

  // tslint:disable-next-line:typedef
  changeDepartment($event: Event) {
    this.curriculumTopicDepartment = new CurriculumTopicDepartment();
    this.curriculumTopicDepartment.DepartmentId = +$event;
    this.curriculumTopicDepartment.CurriculumTopicId = +this.id;
    this.postCurriculumTopicDepartment();
  }

  // tslint:disable-next-line:typedef
  changeMainLiterature($event: Event) {
    this.curriculumTopicMainLiterature = new CurriculumTopicMainLiterature();
    this.curriculumTopicMainLiterature.MainLiteratureId = +$event;
    this.curriculumTopicMainLiterature.CurriculumTopicId = +this.id;
    this.postCurriculumTopicMainLiterature();
  }

  // tslint:disable-next-line:typedef
  changeTeacher($event: Event) {
    this.curriculumTopicTeacher = new CurriculumTopicTeacher();
    this.curriculumTopicTeacher.TeacherId = +$event;
    this.curriculumTopicTeacher.CurriculumTopicId = +this.id;
    this.postCurriculumTopicTeacher();
  }

  // tslint:disable-next-line:typedef
  changeTeacherCategory($event: Event) {
    this.curriculumTopicTeacherCategory = new CurriculumTopicTeacherCategory();
    this.curriculumTopicTeacherCategory.TeacherCategoryId = +$event;
    this.curriculumTopicTeacherCategory.CurriculumTopicId = +this.id;
    this.postCurriculumTopicTeacherCategory();
  }

  // tslint:disable-next-line:typedef
  changeTheQuestion($event: Event) {
    this.curriculumTopicTheQuestion = new CurriculumTopicTheQuestion();
    this.curriculumTopicTheQuestion.TheQuestionId = +$event;
    this.curriculumTopicTheQuestion.CurriculumTopicId = +this.id;
    this.postCurriculumTopicTheQuestion();
  }

  // tslint:disable-next-line:typedef
  changeConsultationTopic($event: Event) {
    this.curriculumTopicConsultationTopic = new CurriculumTopicConsultationTopic();
    this.curriculumTopicConsultationTopic.ConsultationTopicId = +$event;
    this.curriculumTopicConsultationTopic.CurriculumTopicId = +this.id;
    this.postCurriculumTopicConsultationTopic();
  }
}
