import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Department} from '../models/Department';
import {StudentCategory} from '../models/StudentCategory';
import {TestWork} from '../models/TestWork';
import {Regulation} from '../models/Regulation';
import {MainLiterature} from '../models/MainLiterature';
import {AdditionalLiterature} from '../models/AdditionalLiterature';
import {FinalExamination} from '../models/FinalExamination';
import {DepartmentService} from '../services/department.service';
import {TestWorkService} from '../services/test-work.service';
import {FinalExaminationService} from '../services/final-examination.service';
import {StudentCategoryService} from '../services/student-category.service';
import {RegulationService} from '../services/regulation.service';
import {MainLiteratureService} from '../services/main-literature.service';
import {AdditionalLiteratureService} from '../services/additional-literature.service';

@Component({
  selector: 'app-curriculum-topic-add-form',
  templateUrl: './curriculum-topic-add-form.component.html',
  styleUrls: ['./curriculum-topic-add-form.component.scss'],
  providers: [
    AdditionalLiteratureService,
    DepartmentService,
    FinalExaminationService,
    MainLiteratureService,
    RegulationService,
    StudentCategoryService,
    TestWorkService
  ]
})

export class CurriculumTopicAddFormComponent implements OnInit {
  additionalLiteratures: AdditionalLiterature[];
  departments: Department[];
  finalExaminations: FinalExamination[];
  mainLiteratures: MainLiterature[];
  regulations: Regulation[];
  studentCategories: StudentCategory[];
  testWorks: TestWork[];

  // curriculumTopicAdditionalLiterature: CurriculumTopicAdditionalLiterature;
  // curriculumTopicDepartment: CurriculumTopicDepartment;
  // curriculumTopicFinalExamination: CurriculumTopicFinalExamination;
  // curriculumTopicMainLiterature: CurriculumTopicMainLiterature;
  // curriculumTopicRegulation: CurriculumTopicRegulation;
  // curriculumTopicStudentCategory: CurriculumTopicStudentCategory;
  // curriculumTopicTestWork: CurriculumTopicTestWork;
  //
  // public additionalLiteraturesList: CurriculumTopicAdditionalLiterature[] = [{}];
  // public departmentsList: CurriculumTopicDepartment[] = [{}];
  // public finalExaminationsList: CurriculumTopicFinalExamination[] = [{}];
  // public mainLiteraturesList: CurriculumTopicMainLiterature[] = [{}];
  // public regulationsList: CurriculumTopicRegulation[] = [{}];
  // public studentCategoriesList: CurriculumTopicStudentCategory[] = [{}];
  // public testWorksList: CurriculumTopicTestWork[] = [{}];

  private id: number;

  constructor(
    private additionalLiteratureService: AdditionalLiteratureService,
    private departmentService: DepartmentService,
    private finalExaminationService: FinalExaminationService,
    private mainLiteratureService: MainLiteratureService,
    private regulationService: RegulationService,
    private studentCategoryService: StudentCategoryService,
    private testWorkService: TestWorkService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadAdditionalLiterature();
    this.loadDepartment();
    this.loadFinalExamination(1);
    this.loadMainLiterature();
    this.loadRegulation();
    this.loadStudentCategory();
    this.loadTestWork();
    //
    // this.loadCurriculumTopicAdditionalLiterature();
    // this.loadCurriculumTopicDepartment();
    // this.loadCurriculumTopicFinalExamination();
    // this.loadCurriculumTopicMainLiterature();
    // this.loadCurriculumTopicRegulation();
    // this.loadCurriculumTopicStudentCategory();
    // this.loadCurriculumTopicTestWork();
  }


// ##########ADD#############

  // // tslint:disable-next-line:typedef
  // addAdditionalLiterature() {
  //   this.additionalLiteraturesList.push({});
  // }
  //
  // // tslint:disable-next-line:typedef
  // addDepartment() {
  //   this.departmentsList.push({});
  // }
  //
  // // tslint:disable-next-line:typedef
  // addFinalExamination() {
  //   this.finalExaminationsList.push({});
  // }
  //
  // // tslint:disable-next-line:typedef
  // addMainLiterature() {
  //   this.mainLiteraturesList.push({});
  // }
  //
  // // tslint:disable-next-line:typedef
  // addRegulation() {
  //   this.regulationsList.push({});
  // }
  //
  // // tslint:disable-next-line:typedef
  // addStudentCategory() {
  //   this.studentCategoriesList.push({});
  // }
  //
  // // tslint:disable-next-line:typedef
  // addTestWork() {
  //   this.testWorksList.push({});
  // }


// ###########REMOVE##############

  // // tslint:disable-next-line:typedef
  // removeAdditionalLiterature(i: number, el: number) {
  //   this.additionalLiteraturesList.splice(i, 1);
  //   this.curriculumTopicAdditionalLiteratureService.deleteValue(el).subscribe();
  // }
  //
  // // tslint:disable-next-line:typedef
  // removeDepartment(i: number, el: number) {
  //   this.departmentsList.splice(i, 1);
  //   this.curriculumTopicDepartmentService.deleteValue(el).subscribe();
  // }
  //
  // // tslint:disable-next-line:typedef
  // removeFinalExamination(i: number, el: number) {
  //   this.finalExaminationsList.splice(i, 1);
  //   this.curriculumTopicFinalExaminationService.deleteValue(el).subscribe();
  // }
  //
  // // tslint:disable-next-line:typedef
  // removeMainLiterature(i: number, el: number) {
  //   this.mainLiteraturesList.splice(i, 1);
  //   this.curriculumTopicMainLiteratureService.deleteValue(el).subscribe();
  // }
  //
  // // tslint:disable-next-line:typedef
  // removeRegulation(i: number, el: number) {
  //   this.regulationsList.splice(i, 1);
  //   this.curriculumTopicRegulationService.deleteValue(el).subscribe();
  // }
  //
  // // tslint:disable-next-line:typedef
  // removeStudentCategory(i: number, el: number) {
  //   this.studentCategoriesList.splice(i, 1);
  //   this.curriculumTopicStudentCategoryService.deleteValue(el).subscribe();
  // }
  //
  // // tslint:disable-next-line:typedef
  // removeTestWork(i: number, el: number) {
  //   this.testWorksList.splice(i, 1);
  //   this.curriculumTopicTestWorkService.deleteValue(el).subscribe();
  // }


// #######################LOAD###########################

  // tslint:disable-next-line:typedef
  loadAdditionalLiterature() {
    this.additionalLiteratureService.getValues()
      .subscribe((data: AdditionalLiterature[]) => {
        this.additionalLiteratures = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadDepartment() {
    this.departmentService.getValues()
      .subscribe((data: Department[]) => {
        this.departments = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadFinalExamination(certificationTypeIndex: number) {
    this.finalExaminationService.getValue(certificationTypeIndex)
      .subscribe((data: FinalExamination[]) => {
        this.finalExaminations = data;
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
  loadRegulation() {
    this.regulationService.getValues()
      .subscribe((data: Regulation[]) => {
        this.regulations = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadStudentCategory() {
    this.studentCategoryService.getValues()
      .subscribe((data: StudentCategory[]) => {
        this.studentCategories = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadTestWork() {
    this.testWorkService.getValues()
      .subscribe((data: TestWork[]) => {
        this.testWorks = data;
      });
  }

//   // tslint:disable-next-line:typedef
//   loadCurriculumTopicAdditionalLiterature() {
//     this.curriculumTopicAdditionalLiteratureService.getValue(+this.id)
//       .subscribe((data: CurriculumTopicAdditionalLiterature[]) => {
//         if (data.length !== 0){
//           this.additionalLiteraturesList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.additionalLiteraturesList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   loadCurriculumTopicDepartment() {
//     this.curriculumTopicDepartmentService.getValue(+this.id)
//       .subscribe((data: CurriculumTopicDepartment[]) => {
//         if (data.length !== 0){
//           this.departmentsList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.departmentsList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   loadCurriculumTopicFinalExamination() {
//     this.finalExaminationFirst(1);
//   }
//
//   // tslint:disable-next-line:typedef
//   loadCurriculumTopicMainLiterature() {
//     this.curriculumTopicMainLiteratureService.getValue(+this.id)
//       .subscribe((data: CurriculumTopicMainLiterature[]) => {
//         if (data.length !== 0){
//           this.mainLiteraturesList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.mainLiteraturesList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   loadCurriculumTopicRegulation() {
//     this.curriculumTopicRegulationService.getValue(+this.id)
//       .subscribe((data: Regulation[]) => {
//         if (data.length !== 0){
//           this.regulationsList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.regulationsList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   loadCurriculumTopicStudentCategory() {
//     this.curriculumTopicStudentCategoryService.getValue(+this.id)
//       .subscribe((data: CurriculumTopicStudentCategory[]) => {
//         if (data.length !== 0){
//           this.studentCategoriesList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.studentCategoriesList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   loadCurriculumTopicTestWork() {
//     this.curriculumTopicTestWorkService.getValue(+this.id)
//       .subscribe((data: CurriculumTopicTestWork[]) => {
//         if (data.length !== 0){
//           this.testWorksList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.testWorksList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//
// // ######################POST#########################
//
//   // tslint:disable-next-line:typedef
//   postCurriculumTopicAdditionalLiterature() {
//     this.curriculumTopicAdditionalLiteratureService.createValue(this.curriculumTopicAdditionalLiterature)
//       .subscribe((data: CurriculumTopicAdditionalLiterature) => {
//         this.curriculumTopicAdditionalLiterature = data;
//         const tmpObject = this.additionalLiteraturesList.find(a => a.additionalLiteratureId === undefined);
//         const index = this.additionalLiteraturesList.indexOf(tmpObject);
//         this.additionalLiteraturesList[index].id = this.curriculumTopicAdditionalLiterature.id;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   postCurriculumTopicDepartment() {
//     this.curriculumTopicDepartmentService.createValue(this.curriculumTopicDepartment)
//       .subscribe((data: CurriculumTopicDepartment) => {
//         this.curriculumTopicDepartment = data;
//         const tmpObject = this.departmentsList.find(a => a.departmentId === undefined);
//         const index = this.departmentsList.indexOf(tmpObject);
//         this.departmentsList[index].id = this.curriculumTopicDepartment.id;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   postCurriculumTopicFinalExamination() {
//     this.curriculumTopicFinalExaminationService.createValue(this.curriculumTopicFinalExamination)
//       .subscribe((data: CurriculumTopicFinalExamination) => {
//         this.curriculumTopicFinalExamination = data;
//         const tmpObject = this.finalExaminationsList.find(a => a.finalExaminationId === undefined);
//         const index = this.finalExaminationsList.indexOf(tmpObject);
//         this.finalExaminationsList[index].id = this.curriculumTopicFinalExamination.id;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   postCurriculumTopicMainLiterature() {
//     this.curriculumTopicMainLiteratureService.createValue(this.curriculumTopicMainLiterature)
//       .subscribe((data: CurriculumTopicMainLiterature) => {
//         this.curriculumTopicMainLiterature = data;
//         const tmpObject = this.mainLiteraturesList.find(a => a.mainLiteratureId === undefined);
//         const index = this.mainLiteraturesList.indexOf(tmpObject);
//         this.mainLiteraturesList[index].id = this.curriculumTopicMainLiterature.id;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   postCurriculumTopicRegulation() {
//     this.curriculumTopicRegulationService.createValue(this.curriculumTopicRegulation)
//       .subscribe((data: CurriculumTopicRegulation) => {
//         this.curriculumTopicRegulation = data;
//         const tmpObject = this.regulationsList.find(a => a.regulationId === undefined);
//         const index = this.regulationsList.indexOf(tmpObject);
//         this.regulationsList[index].id = this.curriculumTopicRegulation.id;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   postCurriculumTopicStudentCategory() {
//     this.curriculumTopicStudentCategoryService.createValue(this.curriculumTopicStudentCategory)
//       .subscribe((data: CurriculumTopicStudentCategory) => {
//         this.curriculumTopicStudentCategory = data;
//         const tmpObject = this.studentCategoriesList.find(a => a.studentCategoryId === undefined);
//         const index = this.studentCategoriesList.indexOf(tmpObject);
//         this.studentCategoriesList[index].id = this.curriculumTopicStudentCategory.id;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   postCurriculumTopicTestWork() {
//     this.curriculumTopicTestWorkService.createValue(this.curriculumTopicTestWork)
//       .subscribe((data: CurriculumTopicTestWork) => {
//         this.curriculumTopicTestWork = data;
//         const tmpObject = this.testWorksList.find(a => a.testWorkId === undefined);
//         const index = this.testWorksList.indexOf(tmpObject);
//         this.testWorksList[index].id = this.curriculumTopicTestWork.id;
//       });
//   }
//
//
// // ##############UPDATE###############
//
//   // tslint:disable-next-line:typedef
//   updateCurriculumTopicAdditionalLiterature() {
//     this.curriculumTopicAdditionalLiteratureService.updateValue(this.curriculumTopicAdditionalLiterature)
//       .subscribe((data: CurriculumTopicAdditionalLiterature) => {
//         this.curriculumTopicAdditionalLiterature = data;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   updateCurriculumTopicDepartment() {
//     this.curriculumTopicDepartmentService.updateValue(this.curriculumTopicDepartment)
//       .subscribe((data: CurriculumTopicDepartment) => {
//         this.curriculumTopicDepartment = data;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   updateCurriculumTopicFinalExamination() {
//     this.curriculumTopicFinalExaminationService.updateValue(this.curriculumTopicFinalExamination)
//       .subscribe((data: CurriculumTopicFinalExamination) => {
//         this.curriculumTopicFinalExamination = data;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   updateCurriculumTopicMainLiterature() {
//     this.curriculumTopicMainLiteratureService.updateValue(this.curriculumTopicMainLiterature)
//       .subscribe((data: CurriculumTopicMainLiterature) => {
//         this.curriculumTopicMainLiterature = data;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   updateCurriculumTopicRegulation() {
//     this.curriculumTopicRegulationService.updateValue(this.curriculumTopicRegulation)
//       .subscribe((data: CurriculumTopicRegulation) => {
//         this.curriculumTopicRegulation = data;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   updateCurriculumTopicStudentCategory() {
//     this.curriculumTopicStudentCategoryService.updateValue(this.curriculumTopicStudentCategory)
//       .subscribe((data: CurriculumTopicStudentCategory) => {
//         this.curriculumTopicStudentCategory = data;
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   updateCurriculumTopicTestWork() {
//     this.curriculumTopicTestWorkService.updateValue(this.curriculumTopicTestWork)
//       .subscribe((data: CurriculumTopicTestWork) => {
//         this.curriculumTopicTestWork = data;
//       });
//   }


// ###########CHANGE#############
//
//   // tslint:disable-next-line:typedef
//   changeAdditionalLiterature($event: any, el: CurriculumTopicAdditionalLiterature) {
//     this.curriculumTopicAdditionalLiterature = new CurriculumTopicAdditionalLiterature();
//     this.curriculumTopicAdditionalLiterature.additionalLiteratureId = +$event;
//     this.curriculumTopicAdditionalLiterature.curriculumTopicId = +this.id;
//
//     if (el.id !== undefined){
//       this.curriculumTopicAdditionalLiterature.id = el.id;
//       this.updateCurriculumTopicAdditionalLiterature();
//     }
//     else {
//       this.postCurriculumTopicAdditionalLiterature();
//     }
//   }
//
//   // tslint:disable-next-line:typedef
//   changeDepartment($event: any, el: CurriculumTopicDepartment) {
//     this.curriculumTopicDepartment = new CurriculumTopicDepartment();
//     this.curriculumTopicDepartment.departmentId = +$event;
//     this.curriculumTopicDepartment.curriculumTopicId = +this.id;
//     if (el.id !== undefined){
//       this.curriculumTopicDepartment.id = el.id;
//       this.updateCurriculumTopicDepartment();
//     }
//     else {
//       this.postCurriculumTopicDepartment();
//     }
//   }
//
//   // tslint:disable-next-line:typedef
//   changeFinalExamination($event: any, el: CurriculumTopicFinalExamination) {
//     this.curriculumTopicFinalExamination = new CurriculumTopicFinalExamination();
//     this.curriculumTopicFinalExamination.finalExaminationId = +$event;
//     this.curriculumTopicFinalExamination.curriculumTopicId = +this.id;
//
//     if (el.id !== undefined){
//       this.curriculumTopicFinalExamination.id = el.id;
//       this.updateCurriculumTopicFinalExamination();
//     }
//     else {
//       this.postCurriculumTopicFinalExamination();
//     }
//   }
//
//   // tslint:disable-next-line:typedef
//   changeMainLiterature($event: any, el: CurriculumTopicMainLiterature) {
//     this.curriculumTopicMainLiterature = new CurriculumTopicMainLiterature();
//     this.curriculumTopicMainLiterature.mainLiteratureId = +$event;
//     this.curriculumTopicMainLiterature.curriculumTopicId = +this.id;
//
//     if (el.id !== undefined){
//       this.curriculumTopicMainLiterature.id = el.id;
//       this.updateCurriculumTopicMainLiterature();
//     }
//     else {
//       this.postCurriculumTopicMainLiterature();
//     }
//   }
//
//   // tslint:disable-next-line:typedef
//   changeRegulation($event: any, el: CurriculumTopicRegulation) {
//     this.curriculumTopicRegulation = new CurriculumTopicRegulation();
//     this.curriculumTopicRegulation.regulationId = +$event;
//     this.curriculumTopicRegulation.curriculumTopicId = +this.id;
//
//     if (el.id !== undefined){
//       this.curriculumTopicRegulation.id = el.id;
//       this.updateCurriculumTopicRegulation();
//     }
//     else {
//       this.postCurriculumTopicRegulation();
//     }
//   }
//
//   // tslint:disable-next-line:typedef
//   changeStudentCategory($event: any, el: CurriculumTopicStudentCategory) {
//     this.curriculumTopicStudentCategory = new CurriculumTopicStudentCategory();
//     this.curriculumTopicStudentCategory.studentCategoryId = +$event;
//     this.curriculumTopicStudentCategory.curriculumTopicId = +this.id;
//
//     if (el.id !== undefined){
//       this.curriculumTopicStudentCategory.id = el.id;
//       this.updateCurriculumTopicStudentCategory();
//     }
//     else {
//       this.postCurriculumTopicStudentCategory();
//     }
//   }
//
//   // tslint:disable-next-line:typedef
//   changeTestWork($event: any, el: CurriculumTopicTestWork) {
//     this.curriculumTopicTestWork = new CurriculumTopicTestWork();
//     this.curriculumTopicTestWork.testWorkId = +$event;
//     this.curriculumTopicTestWork.curriculumTopicId = +this.id;
//
//     if (el.id !== undefined){
//       this.curriculumTopicTestWork.id = el.id;
//       this.updateCurriculumTopicTestWork();
//     }
//     else {
//       this.postCurriculumTopicTestWork();
//     }
//   }
//
//   // tslint:disable-next-line:typedef
//   finalExaminationFirst(certificationTypeIndex: number) {
//     this.cleanFinalExamination();
//     this.loadFinalExamination(1);
//     this.curriculumTopicFinalExaminationService.getValue(+this.id, certificationTypeIndex)
//       .subscribe((data: CurriculumTopicFinalExamination[]) => {
//         if (data.length !== 0){
//           this.finalExaminationsList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.finalExaminationsList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   finalExaminationSecond(certificationTypeIndex: number) {
//     this.cleanFinalExamination();
//     this.loadFinalExamination(2);
//     this.curriculumTopicFinalExaminationService.getValue(+this.id, certificationTypeIndex)
//       .subscribe((data: CurriculumTopicFinalExamination[]) => {
//         if (data.length !== 0){
//           this.finalExaminationsList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.finalExaminationsList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   finalExaminationThird(certificationTypeIndex: number) {
//     this.cleanFinalExamination();
//     this.loadFinalExamination(3);
//     this.curriculumTopicFinalExaminationService.getValue(+this.id, certificationTypeIndex)
//       .subscribe((data: CurriculumTopicFinalExamination[]) => {
//         if (data.length !== 0){
//           this.finalExaminationsList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.finalExaminationsList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   finalExaminationFourth(certificationTypeIndex: number) {
//     this.cleanFinalExamination();
//     this.loadFinalExamination(4);
//     this.curriculumTopicFinalExaminationService.getValue(+this.id, certificationTypeIndex)
//       .subscribe((data: CurriculumTopicFinalExamination[]) => {
//         if (data.length !== 0){
//           this.finalExaminationsList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.finalExaminationsList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   finalExaminationFifth(certificationTypeIndex: number) {
//     this.cleanFinalExamination();
//     this.loadFinalExamination(5);
//     this.curriculumTopicFinalExaminationService.getValue(+this.id, certificationTypeIndex)
//       .subscribe((data: CurriculumTopicFinalExamination[]) => {
//         if (data.length !== 0){
//           this.finalExaminationsList = data;
//           // tslint:disable-next-line:only-arrow-functions typedef
//           this.finalExaminationsList.sort(function(a, b) {
//             return a.id - b.id;
//           });
//         }
//       });
//   }

  // tslint:disable-next-line:typedef
  // cleanFinalExamination() {
  //   this.finalExaminationsList = [{}];
  //   this.finalExaminations = [{}];
  // }
}
