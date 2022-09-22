import {Component, OnInit} from '@angular/core';
import {CurriculumTopic} from '../../models/CurriculumTopic';
import {CurriculumTopicService} from '../../services/curriculum-topic.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../../models/TrainingProgram';
import {OccupationFormService} from '../../services/occupation-form.service';
import {Globals} from '../../globals';
import {OccupationForm} from '../../models/OccupationForm';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';

@Component({
  selector: 'app-training-program-main-step',
  templateUrl: './training-program-main-step.component.html',
  styleUrls: ['./training-program-main-step..component.scss'],
  providers: [
    CurriculumTopicService,
    OccupationFormService,
  ]
})

export class TrainingProgramMainStepComponent implements OnInit{
  id: number;
  trainingProgram: TrainingProgram;
  occupationForms: OccupationForm[];
  todo = [];
  heading = 'Рекомендуемые темы';

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
    private curriculumTopicService: CurriculumTopicService,
    private occupationFormService: OccupationFormService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  loadTrainingProgram(): void {
    this.trainingProgramConstructorService.TrainingProgram(this.id)
      .subscribe((trainingProgramResponse: TrainingProgram) => {
        this.trainingProgram = trainingProgramResponse;
        this.loadOccupationForms();
      });
  }

  loadOccupationForms(): void {  // Загружаю формы занятия для всех потомков
    this.occupationFormService.getValues()
      .subscribe((data: OccupationForm[]) => {
        if (data.length !== 0){
          data.sort((a, b) => a.id - b.id);
          this.occupationForms = data;
          //this.loadTemplateCurriculumTopics();
          this.loadTemplateCurriculumTopicsByDepartment();
          //this.loadAllTemplateCurriculumTopics();
        }
      });
  }

  loadAllTemplateCurriculumTopics(): void { // Загружаю предложку с фильтрацией
    this.curriculumTopicService.getValues()
      .subscribe((curriculumTopics: CurriculumTopic[]) => {
        if (curriculumTopics.length !== 0) {
          curriculumTopics.sort((a, b) => b.id - a.id);
          curriculumTopics.forEach((curriculumTopic) => {
            this.todo.push({
              curriculumTopicId: curriculumTopic.id,
              topicTitle: curriculumTopic.topicTitle,
              isVariable: false,
              annotation: curriculumTopic.annotation
            });
          });
        }
      });
  }

  loadTemplateCurriculumTopics(): void { // Загружаю предложку с фильтрацией
    this.curriculumTopicService.getValuesFromFilter(
      this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId, this.globals.userId)
      .subscribe((curriculumTopics: CurriculumTopic[]) => {
        if (curriculumTopics.length !== 0) {
          curriculumTopics.sort((a, b) => b.id - a.id);
          curriculumTopics.forEach((curriculumTopic) => {
            this.todo.push({
              curriculumTopicId: curriculumTopic.id,
              topicTitle: curriculumTopic.topicTitle,
              isVariable: false,
              annotation: curriculumTopic.annotation
            });
          });
        }
      });
  }
  loadTemplateCurriculumTopicsByDepartment(): void { // Загружаю предложку, отфильтрованную по кафедре
    this.curriculumTopicService.getValuesByDepartment(
      this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId)
      .subscribe((curriculumTopics: CurriculumTopic[]) => {
        if (curriculumTopics.length !== 0) {
          curriculumTopics.sort((a, b) => b.topicTitle.localeCompare(a.topicTitle));
          curriculumTopics.forEach((curriculumTopic) => {
            this.todo.push({
              curriculumTopicId: curriculumTopic.id,
              topicTitle: curriculumTopic.topicTitle,
              isVariable: false,
              annotation: curriculumTopic.annotation
            });
          });
        }
      });
  }

  addNewTemplate(newTemplate: CurriculumTopic ): void {
    this.todo.push({
      curriculumTopicId: newTemplate.id,
      topicTitle: newTemplate.topicTitle,
      isVariable: false,
      annotation: newTemplate.annotation
    });
  }
}
