import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  ]
})

// tslint:disable-next-line:component-class-suffix
export class CurriculumSectionChild implements OnInit, OnDestroy{
  @Input() done: any[];
  @Input() curriculumSectionNumber: number;
  @Input() id: number;
  @Input() curriculumSectionId: number;

  occupationForms: OccupationForm[] = [];
  curriculumSections: CurriculumSection[] = [];
  curriculumSection: CurriculumSection;
  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram;
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[];
  trainingProgramCurriculumSection: TrainingProgramCurriculumSection;
  addSection: boolean;
  subscription: SubscriptionLike;

  constructor(
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumSectionService: CurriculumSectionService,
    private commonService: CommonService,
    private occupationFormService: OccupationFormService
  ) { }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.loadCurriculumSection();
    this.addSection = false;
    this.curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
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
    }
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadOccupationForm() {
    this.occupationFormService.getValues()
      .subscribe((data: OccupationForm[]) => {
        if (data.length !== 0){
          this.occupationForms.push({id: 0, fullName: 'Выберите тип занятия'});
          data.forEach((object) => {
            this.occupationForms.push(object);
          });
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
          if (this.curriculumSectionId !== 0) {
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
    this.trainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
    this.trainingProgramCurriculumSection.trainingProgramId = +this.id;
    this.trainingProgramCurriculumSection.curriculumSectionId = this.curriculumSection.id;
    this.trainingProgramCurriculumSection.sectionNumber = this.curriculumSectionNumber;
    console.log(this.trainingProgramCurriculumSection);

    this.trainingProgramCurriculumSectionService.createValue(this.trainingProgramCurriculumSection)
      .subscribe((data: TrainingProgramCurriculumSection) => {
        this.trainingProgramCurriculumSection = data;
        console.log('Save was successful');
      });
  }

  // tslint:disable-next-line:typedef
  saveCurriculumTopicTrainingProgram(){ // Сохранение списка тем учебных программ
    let i = 0;
    if (this.curriculumSection !== undefined){
      this.done.forEach((object, index) => {
        i = index + 1;
        this.curriculumTopicTrainingProgram.trainingProgramId = +object.sixth;
        this.curriculumTopicTrainingProgram.curriculumTopicId = object.first;
        this.curriculumTopicTrainingProgram.classHours = object.fourth;
        this.curriculumTopicTrainingProgram.isVariable = object.third;
        this.curriculumTopicTrainingProgram.occupationFormId = object.fifth;
        this.curriculumTopicTrainingProgram.serialNumber = i;
        this.curriculumTopicTrainingProgram.curriculumSectionId = this.curriculumSection.id;
        this.curriculumTopicTrainingProgram.id = object.seventh;
        console.log(this.curriculumTopicTrainingProgram);
        if (this.curriculumTopicTrainingProgram.id === undefined){
          this.curriculumTopicTrainingProgramService.createValue(this.curriculumTopicTrainingProgram)
            .subscribe((data: CurriculumTopicTrainingProgram) => {
              object.seventh = data.id;
              console.log('Save was successful');
            });
        }
        else {
          this.updateCurriculumTopicTrainingProgram(this.curriculumTopicTrainingProgram);
        }
      });
    }
  }

  // UPDATE

  // tslint:disable-next-line:typedef
  updateCurriculumTopicTrainingProgram(tmp: CurriculumTopicTrainingProgram){
    this.curriculumTopicTrainingProgramService.updateValue(tmp)
      .subscribe((data: CurriculumTopicTrainingProgram) => {
        console.log('Update was successful ' + data.serialNumber);
    });
  }

  // DELETE

  // tslint:disable-next-line:typedef
  deleteCurriculumTopicTrainingProgram(data: any){
    if (data !== 'undefined'){
      const idx = this.done.findIndex(a => a.seventh === +data);
      this.curriculumTopicTrainingProgramService.deleteValue(+data).subscribe(() => {
        console.log('Delete was successful ' + data);
        this.done.splice(idx, 1);
      });
    }
  }

  // tslint:disable-next-line:typedef
  addCurriculumSection() {
    // this.addSection = true;
  }
}
