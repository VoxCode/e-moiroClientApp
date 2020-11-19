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
  @Input() name: string;
  @Input() id: number;
  @Input() index: number;

  occupationForms: OccupationForm[] = [];
  curriculumSections: CurriculumSection[] = [];
  curriculumSection: CurriculumSection;
  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram;
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
    this.addSection = false;
    this.curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
    this.loadOccupationForm();
    this.loadCurriculumSection();
    this.subscription = this.commonService.saveCurriculumSectionChild$.subscribe( idx => {
      this.crateCurriculumTopicTrainingProgram();
    });
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

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
        if (data !== undefined){
          this.curriculumSections = data;
          this.curriculumSection = this.curriculumSections.find(a => a.id === this.index);
        }
      });
  }



  // tslint:disable-next-line:typedef
  crateTrainingProgramCurriculumSection(){
    this.trainingProgramCurriculumSection = new TrainingProgramCurriculumSection();
    this.trainingProgramCurriculumSection.trainingProgramId = +this.id;
    this.trainingProgramCurriculumSection.curriculumSectionId = this.curriculumSection.id;
    this.trainingProgramCurriculumSection.sectionNumber = +/\d+/.exec(this.name);
    console.log(this.trainingProgramCurriculumSection);

    this.trainingProgramCurriculumSectionService.createValue(this.trainingProgramCurriculumSection)
      .subscribe((data: TrainingProgramCurriculumSection) => {
        this.trainingProgramCurriculumSection = data;
        console.log('Save was successful');
      });
  }

  // tslint:disable-next-line:typedef
  crateCurriculumTopicTrainingProgram(){
    if (this.curriculumSection !== undefined){
      this.done.forEach((object, index) => {
        this.curriculumTopicTrainingProgram.trainingProgramId = object.sixth;
        this.curriculumTopicTrainingProgram.curriculumTopicId = object.first;
        this.curriculumTopicTrainingProgram.classHours = object.fourth;
        this.curriculumTopicTrainingProgram.isVariable = object.third;
        this.curriculumTopicTrainingProgram.occupationFormId = object.fifth;
        this.curriculumTopicTrainingProgram.serialNumber = index;
        this.curriculumTopicTrainingProgram.curriculumSectionId = this.curriculumSection.id;

        // this.curriculumTopicTrainingProgramService.createValue(this.curriculumTopicTrainingProgram)
        //   .subscribe((data: CurriculumSection) => {
        //     console.log('Save was successful');
        //   });
      });
    }
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

  // tslint:disable-next-line:typedef
  addCurriculumSection() {
    // this.addSection = true;
  }
}
