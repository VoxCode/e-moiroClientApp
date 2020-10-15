import {Component, Input} from '@angular/core';
import {CurriculumTopicService} from '../services/curriculum-topic.service';
import {TrainingProgramService} from '../services/training-program.service';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {OccupationFormService} from '../services/occupation-form.service';
import {CurriculumSectionService} from '../services/curriculum-section.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {OccupationForm} from '../models/OccupationForm';
import {CurriculumSection} from '../models/CurriculumSection';

@Component({
  selector: 'app-curriculum-section-child',
  templateUrl: './curriculum-section-child.html',
  styleUrls: ['./curriculum-section-child.scss'],
  providers: [
    CurriculumTopicService,
    TrainingProgramService,
    CurriculumTopicTrainingProgramService,
    OccupationFormService,
    CurriculumSectionService,
  ]
})



// tslint:disable-next-line:component-class-suffix
export class CurriculumSectionChild {
  @Input() done: any[];
  @Input() name: string;
  @Input() id: number;
  occupationForms: OccupationForm[] = [];
  curriculumSections: CurriculumSection[] = [];

  constructor(
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumSectionService: CurriculumSectionService,
    private occupationFormService: OccupationFormService
  ) { }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.loadOccupationForm();
    this.loadCurriculumSection();
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
        }
      });
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
  @Input() print() {
    console.log(this.done);
  }
}
