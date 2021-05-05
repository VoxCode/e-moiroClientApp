import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CurriculumTopicService} from '../../../services/curriculum-topic.service';
import {TrainingProgramService} from '../../../services/training-program.service';
import {CurriculumTopicTrainingProgramService} from '../../../services/curriculum-topic-training-program.service';
import {CurriculumSectionService} from '../../../services/curriculum-section.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {OccupationForm} from '../../../models/OccupationForm';
import {CurriculumSection} from '../../../models/CurriculumSection';
import {TrainingProgramCurriculumSectionService} from '../../../services/training-program-curriculum-section.service';
import {SubscriptionLike} from 'rxjs';
import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {TrainingProgramCurriculumSection} from '../../../models/TrainingProgramCurriculumSection';
import {CurriculumTopic} from '../../../models/CurriculumTopic';
import {TrainingProgram} from '../../../models/TrainingProgram';
import {CommonService} from '../../../common-service/common-service.component';
import {OccupationFormMaxVariableTopicHoursService} from '../../../services/occupation-form-max-variable-topic-hours.service';
import {OccupationFormMaxVariableTopicHour} from '../../../models/OccupationFormMaxVariableTopicHour';

@Component({
  selector: 'app-curriculum-section-child',
  templateUrl: './curriculum-section-child.component.html',
  styleUrls: ['./curriculum-section-child.component.scss'],
  providers: [
    CurriculumTopicService,
    TrainingProgramService,
    TrainingProgramCurriculumSectionService,
    CurriculumTopicTrainingProgramService,
    CurriculumSectionService,
    OccupationFormMaxVariableTopicHoursService
  ]
})

export class CurriculumSectionChildComponent implements OnInit, OnDestroy {
  @ViewChild ('basicModal') public modal: any;
  @Input() curriculumSectionNumber: number;
  @Input() id: number;
  @Input() curriculumSectionId: number;
  @Input() trainingProgram: TrainingProgram;
  @Input() occupationForms: OccupationForm[];
  @Input() trainingProgramCurriculumSectionId: number;
  @Output() trainingProgramCurriculumSectionIdChange = new EventEmitter();

  occupationFormMaxVariableTopicHours: OccupationFormMaxVariableTopicHour[] = [];
  curriculumSection: CurriculumSection = new CurriculumSection();
  trainingProgramCurriculumSections: TrainingProgramCurriculumSection[] = [];
  trainingProgramCurriculumSectionSelect: TrainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
  subscription: SubscriptionLike;
  curriculumSectionTmp: CurriculumSection = new CurriculumSection();
  curriculumTopicTmp: CurriculumTopic = new CurriculumTopic();
  done = [];

  constructor(
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumSectionService: CurriculumSectionService,
    private commonService: CommonService,
    private occupationFormMaxVariableTopicHoursService: OccupationFormMaxVariableTopicHoursService
  ) { }

  ngOnInit(): void {
    this.subscription = this.commonService.saveCurriculumSectionChild$.subscribe( () => {
      this.saveCurriculumTopicTrainingProgram();
    });
    this.loadCurriculumSection();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container && this.trainingProgramCurriculumSectionId) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.saveCurriculumTopicTrainingProgram();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.saveCurriculumTopicTrainingProgram();
    }
  }

  // LOAD
  loadCurriculumSection(): void {
    this.curriculumSectionService.getValues()
      .subscribe((curriculumSections: CurriculumSection[]) => {
        if (curriculumSections.length !== 0) {
          const trainingProgramCurriculumSections: TrainingProgramCurriculumSection[] = [];
          curriculumSections.forEach(curriculumSection => {
            trainingProgramCurriculumSections.push({
              id: 0,
              trainingProgramId: this.id,
              curriculumSectionId: curriculumSection.id,
              sectionNumber: this.curriculumSectionNumber,
              name: curriculumSection.name
            });
          });
          this.trainingProgramCurriculumSections = trainingProgramCurriculumSections;
          if (this.curriculumSectionId !== 0 && this.trainingProgramCurriculumSectionId !== 0) {
            this.trainingProgramCurriculumSectionSelect = this.trainingProgramCurriculumSections
              .find(a => a.curriculumSectionId === this.curriculumSectionId);
            if (this.trainingProgramCurriculumSectionSelect) {
              this.loadCurriculumTopicTrainingProgram();
            }
          }
          else {
            this.crateTrainingProgramCurriculumSection();
          }
        }
      });
  }

  loadCurriculumTopicTrainingProgram(): void {
    this.curriculumTopicTrainingProgramService.getFromTrainingProgramCurriculumSection(this.trainingProgramCurriculumSectionId)
      .subscribe((curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[]) => {
        if (curriculumTopicTrainingPrograms) {
          curriculumTopicTrainingPrograms
            .sort((a, b) => a.serialNumber - b.serialNumber);
          curriculumTopicTrainingPrograms.forEach((curriculumTopicTrainingProgram) => {
            // this.occupationFormMaxVariableTopicHoursService.getValue(this.id, object.id)
            //   .subscribe((occupationFormMaxVariableTopicHours: OccupationFormMaxVariableTopicHour[]) => {
            //
            //   }); // тут остановился
            this.done.push({
              second: curriculumTopicTrainingProgram.topicTitle,
              third: curriculumTopicTrainingProgram.isVariable,
              fourth: curriculumTopicTrainingProgram.classHours,
              seventh: curriculumTopicTrainingProgram.id,
              eight: curriculumTopicTrainingProgram.serialNumber,
              ninth: curriculumTopicTrainingProgram.annotation
            });
          });
        }
      });
  }

  // SAVE
  saveCurriculumTopicTrainingProgram(): void { // Сохранение списка тем учебных программ
    // let i = 0;
    // if (this.trainingProgramCurriculumSectionSelect){
    //   this.done.forEach((object, index) => {
    //     let curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
    //     i = index + 1;
    //     curriculumTopicTrainingProgram.trainingProgramId = +object.sixth;
    //     curriculumTopicTrainingProgram.curriculumTopicId = object.first;
    //     curriculumTopicTrainingProgram.classHours = object.fourth;
    //     curriculumTopicTrainingProgram.isVariable = object.third;
    //     if (object.fifth) {
    //       curriculumTopicTrainingProgram.occupationFormId = object.fifth;
    //     }
    //     else {
    //       curriculumTopicTrainingProgram.occupationFormId = 1;
    //     }
    //     curriculumTopicTrainingProgram.serialNumber = i;
    //     curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSectionId;
    //     curriculumTopicTrainingProgram.id = object.seventh;
    //     if (curriculumTopicTrainingProgram.id){
    //       this.curriculumTopicTrainingProgramService.createValue(curriculumTopicTrainingProgram)
    //         .subscribe((data: CurriculumTopicTrainingProgram) => {
    //           object.seventh = data.id;
    //           console.log('Save was successful');
    //           curriculumTopicTrainingProgram = null;
    //         });
    //     }
    //     else {
    //       this.updateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram);
    //       curriculumTopicTrainingProgram = null;
    //     }
    //   });
    // }
  }

  // UPDATE
  updateTrainingProgramCurriculumSection(): void {
    this.trainingProgramCurriculumSectionSelect.id = this.trainingProgramCurriculumSectionId;
    this.trainingProgramCurriculumSectionService.updateValue(this.trainingProgramCurriculumSectionSelect)
      .subscribe(() => {
        console.log('Update was successful');
      });
  }

  updateCurriculumTopicTrainingProgram(tmp: CurriculumTopicTrainingProgram): void {
    this.curriculumTopicTrainingProgramService.updateValue(tmp)
      .subscribe((data: CurriculumTopicTrainingProgram) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  updateSingleCurriculumTopicTrainingProgram(tmp: any): void {
    // const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
    // curriculumTopicTrainingProgram.id = tmp.seventh;
    // curriculumTopicTrainingProgram.isVariable = tmp.third;
    // curriculumTopicTrainingProgram.classHours = tmp.fourth;
    // curriculumTopicTrainingProgram.serialNumber = tmp.eight;
    // curriculumTopicTrainingProgram.curriculumTopicId = tmp.first;
    // curriculumTopicTrainingProgram.occupationFormId = tmp.fifth;
    // curriculumTopicTrainingProgram.trainingProgramId = tmp.sixth;
    // curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSectionId;
    //
    // this.curriculumTopicTrainingProgramService.updateValue(curriculumTopicTrainingProgram)
    //   .subscribe((data: CurriculumTopicTrainingProgram) => {
    //     console.log('Update was successful ' + data.serialNumber);
    //   });
  }

  // DELETE
  deleteCurriculumTopicTrainingProgram(id: any, indx: number): void {
    this.done.splice(indx, 1);
    if (id !== 'undefined'){
      this.curriculumTopicTrainingProgramService.deleteValue(id).subscribe(() => {
        console.log('Delete was successful ' + id);
      });
    }
  }

  cancel(): void {
    this.curriculumSectionTmp = new CurriculumSection();
    this.curriculumTopicTmp = new CurriculumTopic();
  }

  addCurriculumSection(): void {
    this.crateCurriculumSection();
  }

  crateTrainingProgramCurriculumSection(): void {
    // this.modal.show();
    const model: TrainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
    model.sectionNumber = this.curriculumSectionNumber;
    // model.curriculumSectionId = 31;
    model.id = 0;
    model.trainingProgramId = this.id;
    this.trainingProgramCurriculumSectionService.createValue(model)
      .subscribe((data: TrainingProgramCurriculumSection) => {
        this.trainingProgramCurriculumSectionSelect = data;
        this.trainingProgramCurriculumSectionSelect.name = 'Выбрите раздел';
        this.trainingProgramCurriculumSectionId = data.id;
        this.trainingProgramCurriculumSectionIdChange.emit(data.id);
        console.log('Crate was successful');
      });
  }

  crateCurriculumSection(): void {
    this.curriculumSectionService.createValue(this.curriculumSectionTmp)
      .subscribe((data: CurriculumSection) => {
        if (data) {
          this.curriculumSectionTmp.id = data.id;
          const model: TrainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
          model.id = this.trainingProgramCurriculumSectionId;
          model.curriculumSectionId = this.curriculumSectionTmp.id;
          model.name = this.curriculumSectionTmp.name;
          model.sectionNumber = this.curriculumSectionNumber;
          model.trainingProgramId = this.id;
          this.trainingProgramCurriculumSectionSelect = model;
          console.log('Success');
          this.updateTrainingProgramCurriculumSection();
          this.cancel();
          this.loadTrainingProgramCurriculumSectionAfter();
        }
      });
  }

  loadTrainingProgramCurriculumSectionAfter(): void {
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
  addCurriculumTopic(): void {
    this.crateCurriculumTopic();
  }

  crateCurriculumTopic(): void {
    this.curriculumTopicService.createValue(this.curriculumTopicTmp)
      .subscribe((data: CurriculumTopic) => {
        if (data){
          this.curriculumTopicTmp = data;
          console.log('Success CurriculumTopic');
          this.done.push({
            first: this.curriculumTopicTmp.id,
            second: this.curriculumTopicTmp.topicTitle,
            sixth: this.id,
            third: false,
            fourth: 0,
            fifth: 1
          });
          this.crateCurriculumTopicStudentCategory();
        }
      });
  }

  crateCurriculumTopicStudentCategory(): void {
    // const tmp: CurriculumTopicStudentCategory = new CurriculumTopicStudentCategory();
    // tmp.curriculumTopicId = this.curriculumTopicTmp.id;
    // tmp.studentCategoryId = this.trainingProgram.studentCategoryId;
    // this.curriculumTopicStudentCategoryService.createValue(tmp)
    //   .subscribe((data: CurriculumTopicStudentCategory) => {
    //     if (data){
    //       console.log('Success StudentCategory');
    //       this.crateCurriculumTopicDepartment();
    //     }
    //   });
  }

  crateCurriculumTopicDepartment(): void {
    // const tmp: CurriculumTopicDepartment = new CurriculumTopicDepartment();
    // tmp.curriculumTopicId = this.curriculumTopicTmp.id;
    // tmp.departmentId = this.trainingProgram.departmentId;
    // this.curriculumTopicDepartmentService.createValue(tmp)
    //   .subscribe((data: CurriculumTopicDepartment) => {
    //     if (data){
    //       console.log('Success Department');
    //       this.cancel();
    //       this.saveCurriculumTopicTrainingProgram();
    //     }
    //   });
  }
}
