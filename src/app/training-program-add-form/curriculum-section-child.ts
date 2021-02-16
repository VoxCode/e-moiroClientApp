import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CurriculumTopicService} from '../services/curriculum-topic.service';
import {TrainingProgramService} from '../services/training-program.service';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {OccupationFormService} from '../services/occupation-form.service';
import {CurriculumSectionService} from '../services/curriculum-section.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {OccupationForm} from '../models/OccupationForm';
import {CurriculumSection} from '../models/CurriculumSection';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {CommonService} from '../common-service/common-service.component';
import {SubscriptionLike} from 'rxjs';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {CurriculumTopic} from '../models/CurriculumTopic';
import {CurriculumTopicStudentCategoryService} from '../services/curriculum-topic-student-category.service';
import {CurriculumTopicDepartmentService} from '../services/curriculum-topic-department.service';
import {CurriculumTopicStudentCategory} from '../models/CurriculumTopicStudentCategory';
import {CurriculumTopicDepartment} from '../models/СurriculumTopicDepartment';
import {TrainingProgram} from '../models/TrainingProgram';


@Component({
  selector: 'app-curriculum-section-child',
  templateUrl: './curriculum-section-child.html',
  styleUrls: ['./curriculum-section-child.scss'],
  providers: [
    CurriculumTopicService,
    TrainingProgramService,
    TrainingProgramCurriculumSectionService,
    CurriculumTopicTrainingProgramService,
    OccupationFormService,
    CurriculumSectionService,
    CurriculumTopicStudentCategoryService,
    CurriculumTopicDepartmentService
  ]
})

// tslint:disable-next-line:component-class-suffix
export class CurriculumSectionChild implements OnInit, OnDestroy{
  @Input() done: any[];
  @Input() curriculumSectionNumber: number;
  @Input() id: number;
  @Input() curriculumSectionId: number;
  @Input() trainingProgramCurriculumSectionId: number;
  @Output() trainingProgramCurriculumSectionIdChange = new EventEmitter();

  occupationForms: OccupationForm[] = [];
  curriculumSection: CurriculumSection = new CurriculumSection();
  trainingProgramCurriculumSections: TrainingProgramCurriculumSection[] = [];
  trainingProgramCurriculumSectionSelect: TrainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[];
  subscription: SubscriptionLike;
  curriculumSectionTmp: CurriculumSection = new CurriculumSection();
  curriculumTopicTmp: CurriculumTopic = new CurriculumTopic();
  trainingProgram: TrainingProgram;

  constructor(
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumSectionService: CurriculumSectionService,
    private commonService: CommonService,
    private occupationFormService: OccupationFormService,
    private curriculumTopicStudentCategoryService: CurriculumTopicStudentCategoryService,
    private curriculumTopicDepartmentService: CurriculumTopicDepartmentService
  ) { }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.loadOccupationForm();

    this.subscription = this.commonService.saveCurriculumSectionChild$.subscribe( idx => {
      this.saveCurriculumTopicTrainingProgram();
    });
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription = null;
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
      this.saveCurriculumTopicTrainingProgram();
    }
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadOccupationForm() {
    this.occupationFormService.getValues()
      .subscribe((data: OccupationForm[]) => {
        if (data.length !== 0){
          this.occupationForms = data;
          this.loadTrainingProgram();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
          this.loadCurriculumSection();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumSection(){
    this.curriculumSectionService.getSelectValues(this.trainingProgram.departmentId)
      .subscribe((data: CurriculumSection[]) => {
        if (data.length !== 0) {
          const model: TrainingProgramCurriculumSection[] = [];
          data.forEach(tmp => {
            model.push({
              id: 0,
              trainingProgramId: this.id,
              curriculumSectionId: tmp.id,
              sectionNumber: this.curriculumSectionNumber,
              name: tmp.name
            });
          });
          this.trainingProgramCurriculumSections = model;
          if (this.curriculumSectionId !== 0 && this.trainingProgramCurriculumSectionId !== 0) {
            this.trainingProgramCurriculumSectionSelect = this.trainingProgramCurriculumSections
              .find(a => a.curriculumSectionId === this.curriculumSectionId);
            if (this.trainingProgramCurriculumSectionSelect !== undefined){
              this.loadCurriculumTopicTrainingProgram();
            }
          }
          else {
            this.crateTrainingProgramCurriculumSection();
          }
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram(){
    this.curriculumTopicTrainingProgramService.getValueList(
      this.id, this.trainingProgramCurriculumSectionId)
      .subscribe((data: CurriculumTopicTrainingProgram[]) => {
        if (data !== undefined){
          this.curriculumTopicTrainingPrograms = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.curriculumTopicTrainingPrograms.sort(function(a, b) {
            return a.serialNumber - b.serialNumber;
          });
          this.curriculumTopicTrainingPrograms.forEach((object, index) => {
            this.done.push({
              first: object.curriculumTopicId,
              second: object.topicTitle,
              third: object.isVariable,
              fourth: object.classHours,
              fifth: object.occupationFormId,
              sixth: object.trainingProgramId,
              seventh: object.id,
              eight: object.serialNumber,
              ninth: object.annotation
            });
          });
        }
      });
  }

  // SAVE

  // tslint:disable-next-line:typedef
  saveCurriculumTopicTrainingProgram(){ // Сохранение списка тем учебных программ
    let i = 0;
    if (this.trainingProgramCurriculumSectionSelect !== undefined){
      this.done.forEach((object, index) => {
        let curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
        i = index + 1;
        curriculumTopicTrainingProgram.trainingProgramId = +object.sixth;
        curriculumTopicTrainingProgram.curriculumTopicId = object.first;
        curriculumTopicTrainingProgram.classHours = object.fourth;
        curriculumTopicTrainingProgram.isVariable = object.third;
        if (object.fifth) {
          curriculumTopicTrainingProgram.occupationFormId = object.fifth;
        }
        else {
          curriculumTopicTrainingProgram.occupationFormId = 1;
        }
        curriculumTopicTrainingProgram.serialNumber = i;
        curriculumTopicTrainingProgram.curriculumSectionId = this.trainingProgramCurriculumSectionSelect.curriculumSectionId;
        curriculumTopicTrainingProgram.id = object.seventh;
        if (curriculumTopicTrainingProgram.id === undefined){
          this.curriculumTopicTrainingProgramService.createValue(curriculumTopicTrainingProgram)
            .subscribe((data: CurriculumTopicTrainingProgram) => {
              object.seventh = data.id;
              console.log('Save was successful');
              curriculumTopicTrainingProgram = null;
            });
        }
        else {
          this.updateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram);
          curriculumTopicTrainingProgram = null;
        }
      });
    }
  }

  // UPDATE

  // tslint:disable-next-line:typedef
  updateTrainingProgramCurriculumSection(){
    this.trainingProgramCurriculumSectionSelect.id = this.trainingProgramCurriculumSectionId;
    console.log(this.trainingProgramCurriculumSectionSelect);
    this.trainingProgramCurriculumSectionService.updateValue(this.trainingProgramCurriculumSectionSelect)
      .subscribe((data: TrainingProgramCurriculumSection) => {
        console.log('Update was successful');
      });
  }

  // tslint:disable-next-line:typedef
  updateCurriculumTopicTrainingProgram(tmp: CurriculumTopicTrainingProgram){
    this.curriculumTopicTrainingProgramService.updateValue(tmp)
      .subscribe((data: CurriculumTopicTrainingProgram) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  // tslint:disable-next-line:typedef
  updateSingleCurriculumTopicTrainingProgram(tmp: any){
    const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
    curriculumTopicTrainingProgram.id = tmp.seventh;
    curriculumTopicTrainingProgram.isVariable = tmp.third;
    curriculumTopicTrainingProgram.classHours = tmp.fourth;
    curriculumTopicTrainingProgram.serialNumber = tmp.eight;
    curriculumTopicTrainingProgram.curriculumTopicId = tmp.first;
    curriculumTopicTrainingProgram.occupationFormId = tmp.fifth;
    curriculumTopicTrainingProgram.trainingProgramId = tmp.sixth;
    curriculumTopicTrainingProgram.curriculumSectionId = this.trainingProgramCurriculumSectionSelect.curriculumSectionId;

    this.curriculumTopicTrainingProgramService.updateValue(curriculumTopicTrainingProgram)
      .subscribe((data: CurriculumTopicTrainingProgram) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  // DELETE

  // tslint:disable-next-line:typedef
  deleteCurriculumTopicTrainingProgram(id: any, indx: number){
    this.done.splice(indx, 1);
    if (id !== 'undefined'){
      this.curriculumTopicTrainingProgramService.deleteValue(id).subscribe(() => {
        console.log('Delete was successful ' + id);
      });
    }
  }

  // tslint:disable-next-line:typedef
  cancel() {
    this.curriculumSectionTmp = new CurriculumSection();
    this.curriculumTopicTmp = new CurriculumTopic();
  }

  // tslint:disable-next-line:typedef
  addCurriculumSection() {
    this.crateCurriculumSection();
  }

  // tslint:disable-next-line:typedef
  crateTrainingProgramCurriculumSection(){
    const model: TrainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
    model.sectionNumber = this.curriculumSectionNumber;
    model.curriculumSectionId = 1;
    model.id = 0;
    model.trainingProgramId = this.id;
    this.trainingProgramCurriculumSectionService.createValue(model)
      .subscribe((data: TrainingProgramCurriculumSection) => {
        console.log(data.id);
        model.id = data.id;
        model.name = this.trainingProgramCurriculumSections
          .find(a => a.curriculumSectionId === model.curriculumSectionId).name;
        this.trainingProgramCurriculumSectionId = data.id;
        this.trainingProgramCurriculumSectionIdChange.emit(data.id);
        this.trainingProgramCurriculumSectionSelect = model;
        console.log('Crate was successful');
      });
  }

  // tslint:disable-next-line:typedef
  crateCurriculumSection(){
    this.curriculumSectionService.createValue(this.curriculumSectionTmp)
      .subscribe((data: CurriculumSection) => {
        if (data !== undefined){
          this.curriculumSectionTmp.id = data.id;
          this.trainingProgramCurriculumSectionSelect.id = this.trainingProgramCurriculumSectionId;
          this.trainingProgramCurriculumSectionSelect.curriculumSectionId = this.curriculumSectionTmp.id;
          this.trainingProgramCurriculumSectionSelect.name = this.curriculumSectionTmp.name;
          console.log('Success');
          this.updateTrainingProgramCurriculumSection();
          this.cancel();
          this.loadTrainingProgramCurriculumSectionAfter();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramCurriculumSectionAfter(){
    this.curriculumSectionService.getSelectValues(this.trainingProgram.departmentId)
      .subscribe((data: CurriculumSection[]) => {
        if (data.length !== 0) {
          const model: TrainingProgramCurriculumSection[] = [];
          data.forEach(tmp => {
            model.push({
              id: 0,
              trainingProgramId: this.id,
              curriculumSectionId: tmp.id,
              sectionNumber: this.curriculumSectionNumber,
              name: tmp.name
            });
          });
          this.trainingProgramCurriculumSections = model;
        }
      });
  }



  // CurriculumTopic

  // tslint:disable-next-line:typedef
  addCurriculumTopic() {
    this.crateCurriculumTopic();
  }

  // tslint:disable-next-line:typedef
  crateCurriculumTopic(){
    this.curriculumTopicService.createValue(this.curriculumTopicTmp)
      .subscribe((data: CurriculumTopic) => {
        if (data !== undefined){
          this.curriculumTopicTmp = data;
          console.log('Success CurriculumTopic');
          this.done.push({
            first: this.curriculumTopicTmp.id,
            second: this.curriculumTopicTmp.topicTitle,
            sixth: this.id,
            third: false,
            fourth: 0,
            fifth: 0
          });
          this.crateCurriculumTopicStudentCategory();
        }
      });
  }

  // tslint:disable-next-line:typedef
  crateCurriculumTopicStudentCategory(){
    const tmp: CurriculumTopicStudentCategory = new CurriculumTopicStudentCategory();
    tmp.curriculumTopicId = this.curriculumTopicTmp.id;
    tmp.studentCategoryId = this.trainingProgram.studentCategoryId;
    this.curriculumTopicStudentCategoryService.createValue(tmp)
      .subscribe((data: CurriculumTopicStudentCategory) => {
        if (data !== undefined){
          console.log('Success StudentCategory');
          this.crateCurriculumTopicDepartment();
        }
      });
  }

  // tslint:disable-next-line:typedef
  crateCurriculumTopicDepartment(){
    const tmp: CurriculumTopicDepartment = new CurriculumTopicDepartment();
    tmp.curriculumTopicId = this.curriculumTopicTmp.id;
    tmp.departmentId = this.trainingProgram.departmentId;
    this.curriculumTopicDepartmentService.createValue(tmp)
      .subscribe((data: CurriculumTopicDepartment) => {
        if (data !== undefined){
          console.log('Success Department');
          this.cancel();
          this.saveCurriculumTopicTrainingProgram();
        }
      });
  }
}
