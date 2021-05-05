import {Component, OnInit} from '@angular/core';
import {CurriculumTopic} from '../../models/CurriculumTopic';
import {CurriculumTopicService} from '../../services/curriculum-topic.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramService} from '../../services/training-program.service';
import {TrainingProgram} from '../../models/TrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../../services/curriculum-topic-training-program.service';
import {CurriculumTopicTrainingProgram} from '../../models/СurriculumTopicTrainingProgram';
import {CurriculumSectionService} from '../../services/curriculum-section.service';
import {OccupationFormService} from '../../services/occupation-form.service';
import {CommonService} from '../../common-service/common-service.component';
import {TrainingProgramCurriculumSectionService} from '../../services/training-program-curriculum-section.service';
import {TrainingProgramCurriculumSection} from '../../models/TrainingProgramCurriculumSection';
import {Globals} from '../../globals';
import {OccupationForm} from '../../models/OccupationForm';

@Component({
  selector: 'app-training-program-main-step',
  templateUrl: './training-program-main-step.component.html',
  styleUrls: ['./training-program-main-step..component.scss'],
  providers: [
    CurriculumTopicService,
    TrainingProgramService,
    CurriculumTopicTrainingProgramService,
    TrainingProgramCurriculumSectionService,
    OccupationFormService,
    CurriculumSectionService
  ]
})

export class TrainingProgramMainStepComponent implements OnInit{
  id: number;
  value: number;
  trainingProgram: TrainingProgram;
  curriculumTopic: CurriculumTopic;
  searchText: string;

  curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram = {
    isVariable: false,
    classHours: 0
  };

  curriculumSectionChildren: any = [];
  occupationForms: OccupationForm[];
  todo = [];
  name: string;

  constructor(
    public globals: Globals,
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private curriculumSectionService: CurriculumSectionService,
    private occupationFormService: OccupationFormService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.trainingProgram = new TrainingProgram();
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  // LOAD
  loadTrainingProgram(): void {
    this.trainingProgramService.getValue(this.id)  // Загружаю учебную программу
      .subscribe((data: TrainingProgram) => {
        if (data) {
          this.trainingProgram = data;
          this.loadOccupationForms();
        }
      });
  }

  loadOccupationForms(): void {  // Загружаю формы занятия для всех потомков (нужно закинуть в общий класс)
    this.occupationFormService.getValues()
      .subscribe((data: OccupationForm[]) => {
        if (data.length !== 0){
          this.occupationForms = data;
          this.loadTrainingProgramCurriculumSections();
        }
      });
  }

  loadTrainingProgramCurriculumSections(): void {
    this.trainingProgramCurriculumSectionService.getValue(this.id)
      .subscribe((trainingProgramCurriculumSections: TrainingProgramCurriculumSection[]) => {
        if (trainingProgramCurriculumSections) {
          trainingProgramCurriculumSections.sort((a, b) => a.sectionNumber - b.sectionNumber);
          trainingProgramCurriculumSections.forEach( trainingProgramCurriculumSection => {
            this.addCurriculumSectionChild(trainingProgramCurriculumSection.curriculumSectionId, trainingProgramCurriculumSection.id);
          });
          this.loadCurriculumTopicsFromTrainingProgram();
        }
      });
  }

  loadCurriculumTopicsFromTrainingProgram(): void {
    this.curriculumTopicService.getFromTrainingProgram(this.id)
      .subscribe((curriculumTopics: CurriculumTopic[]) => {
        if (curriculumTopics.length !== 0) {
          this.loadCurriculumTopic(curriculumTopics);
        }
      });
  }

  loadCurriculumTopic(curriculumTopicsAdded: CurriculumTopic[]): void {
    this.curriculumTopicService.getValue(this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId)
      .subscribe((curriculumTopics: CurriculumTopic[]) => {
        if (curriculumTopics.length !== 0) {
          curriculumTopics.sort((a, b) => b.id - a.id);
          curriculumTopics.forEach((curriculumTopic) => {
            const curriculumTopicTrainingProgram = curriculumTopicsAdded.find(a => a.id === curriculumTopic.id);
            if (!curriculumTopicTrainingProgram) {
              this.todo.push({
                first: curriculumTopic.id,
                second: curriculumTopic.topicTitle,
                third: this.curriculumTopicTrainingProgram.isVariable,
                fourth: 0,
                fifth: 1,
                sixth: this.id,
                ninth: curriculumTopic.annotation
              });
            }
          });
        }
      });
  }

  // ADD
  addCurriculumSectionChild(curriculumSectionId: number, trainingProgramCurriculumSectionId: number): void {
    this.curriculumSectionChildren.push({
      curriculumSectionId,
      trainingProgramCurriculumSectionId
    });
  }

  // SAVE FULL
  save(): void {
    this.commonService.saveCurriculumSectionChild$.next(1);
  }

  // DELETE
  deleteTrainingProgramCurriculumSection(index: number, id: number): void {
    this.curriculumSectionChildren.splice(index, 1);
    this.trainingProgramCurriculumSectionService.deleteValue(id).subscribe();
  }
}
