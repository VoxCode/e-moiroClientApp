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
  curriculumSections: CurriculumSection[] = [];
  curriculumSection: CurriculumSection;
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[];
  trainingProgramCurriculumSection: TrainingProgramCurriculumSection;
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
    this.loadCurriculumSection();
    this.loadOccupationForm();
    this.loadTrainingProgram();

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
    }
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadOccupationForm() {
    this.occupationFormService.getValues()
      .subscribe((data: OccupationForm[]) => {
        if (data.length !== 0){
          this.occupationForms.push({id: 0, fullName: 'Выбрать тип занятия'});
          data.forEach((object) => {
            this.occupationForms.push(object);
          });
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumSection(){
    this.curriculumSectionService.getValues()
      .subscribe((data: CurriculumSection[]) => {
        if (data !== undefined) {
          this.curriculumSections = data;
          if (this.curriculumSections !== undefined) {
            this.curriculumSection = this.curriculumSections.find(a => a.id === this.curriculumSectionId);
          }
          if (this.curriculumSectionId !== 0 && this.trainingProgramCurriculumSectionId !== 0) {
            this.loadCurriculumTopicTrainingProgram();
          }
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram(){
      this.curriculumTopicTrainingProgramService.getValueList(this.id, this.curriculumSection.id, this.curriculumSectionNumber)
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
                eight: object.serialNumber
              });
            });
          }
        });
  }

  // SAVE

  // tslint:disable-next-line:typedef
  saveTrainingProgramCurriculumSection(){
    if (this.curriculumSection !== null){
      this.trainingProgramCurriculumSection = null;
      this.trainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
      this.trainingProgramCurriculumSection.trainingProgramId = +this.id;
      this.trainingProgramCurriculumSection.curriculumSectionId = this.curriculumSection.id;
      this.trainingProgramCurriculumSection.sectionNumber = this.curriculumSectionNumber;
      this.trainingProgramCurriculumSection.id = this.trainingProgramCurriculumSectionId;
    }
    if (this.trainingProgramCurriculumSection.id === undefined || this.trainingProgramCurriculumSection.id === 0){
      this.trainingProgramCurriculumSectionService.createValue(this.trainingProgramCurriculumSection)
        .subscribe((data: TrainingProgramCurriculumSection) => {
          this.trainingProgramCurriculumSection.id = data.id;
          this.trainingProgramCurriculumSectionId = data.id;
          this.trainingProgramCurriculumSectionIdChange.emit(data.id);
          console.log('Save was successful');
        });
    }
    else {
      this.updateTrainingProgramCurriculumSection();
    }
  }

  // tslint:disable-next-line:typedef
  saveCurriculumTopicTrainingProgram(){ // Сохранение списка тем учебных программ
    let i = 0;
    if (this.curriculumSection !== undefined){
      this.done.forEach((object, index) => {
        let curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
        i = index + 1;
        curriculumTopicTrainingProgram.trainingProgramId = +object.sixth;
        curriculumTopicTrainingProgram.curriculumTopicId = object.first;
        curriculumTopicTrainingProgram.classHours = object.fourth;
        curriculumTopicTrainingProgram.isVariable = object.third;
        curriculumTopicTrainingProgram.occupationFormId = object.fifth;
        curriculumTopicTrainingProgram.serialNumber = i;
        curriculumTopicTrainingProgram.curriculumSectionId = this.curriculumSection.id;
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
    this.trainingProgramCurriculumSectionService.updateValue(this.trainingProgramCurriculumSection)
      .subscribe((data: TrainingProgramCurriculumSection) => {
        this.trainingProgramCurriculumSection.id = data.id;
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

  // DELETE

  // tslint:disable-next-line:typedef
  deleteCurriculumTopicTrainingProgram(data: any, indx: number){
    this.done.splice(indx, 1);
    if (data !== 'undefined'){
      this.curriculumTopicTrainingProgramService.deleteValue(+data).subscribe(() => {
        console.log('Delete was successful ' + data);
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
  crateCurriculumSection(){
    this.curriculumSectionService.createValue(this.curriculumSectionTmp)
      .subscribe((data: CurriculumSection) => {
        if (data !== undefined){
          this.curriculumSectionTmp = data;
          this.curriculumSection = this.curriculumSectionTmp;
          console.log('Success');
          this.saveTrainingProgramCurriculumSection();
          this.cancel();
          this.loadCurriculumSectionAfter();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumSectionAfter(){
    this.curriculumSectionService.getValues()
      .subscribe((data: CurriculumSection[]) => {
        if (data !== undefined) {
          this.curriculumSections = data;
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
        }
      });
  }

}
