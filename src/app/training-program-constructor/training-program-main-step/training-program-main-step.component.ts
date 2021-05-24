import {Component, OnInit} from '@angular/core';
import {CurriculumTopic} from '../../models/CurriculumTopic';
import {CurriculumTopicService} from '../../services/curriculum-topic.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramService} from '../../services/training-program.service';
import {TrainingProgram} from '../../models/TrainingProgram';
import {OccupationFormService} from '../../services/occupation-form.service';
import {Globals} from '../../globals';
import {OccupationForm} from '../../models/OccupationForm';

@Component({
  selector: 'app-training-program-main-step',
  templateUrl: './training-program-main-step.component.html',
  styleUrls: ['./training-program-main-step..component.scss'],
  providers: [
    CurriculumTopicService,
    TrainingProgramService,
    OccupationFormService,
  ]
})

export class TrainingProgramMainStepComponent implements OnInit{
  id: number;
  trainingProgram: TrainingProgram;
  occupationForms: OccupationForm[];
  todo = [];

  constructor(
    public globals: Globals,
    private curriculumTopicService: CurriculumTopicService,
    private trainingProgramService: TrainingProgramService,
    private occupationFormService: OccupationFormService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

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
          data.sort((a, b) => a.id - b.id);
          this.occupationForms = data;
          this.loadUsedTemplates();
        }
      });
  }

  loadUsedTemplates(): void { // Загружаю шаблоны которые уже используются в этой учебной программе
    this.curriculumTopicService.getFromTrainingProgram(this.id)
      .subscribe((curriculumTopics: CurriculumTopic[]) => {
        if (curriculumTopics.length !== 0) {
          this.loadTemplateCurriculumTopics(curriculumTopics);
        }
      });
  }

  loadTemplateCurriculumTopics(curriculumTopicsUsed: CurriculumTopic[]): void { // Загружаю предложку с фильтрацией
    this.curriculumTopicService.getValue(this.trainingProgram.studentCategoryId, this.trainingProgram.departmentId)
      .subscribe((curriculumTopics: CurriculumTopic[]) => {
        if (curriculumTopics.length !== 0) {
          curriculumTopics.sort((a, b) => b.id - a.id);
          curriculumTopics.forEach((curriculumTopic) => {
            const used = curriculumTopicsUsed.find(a => a.id === curriculumTopic.id);
            if (!used) {
              this.todo.push({
                curriculumTopicId: curriculumTopic.id,
                topicTitle: curriculumTopic.topicTitle,
                isVariable: false,
                annotation: curriculumTopic.annotation
              });
            }
          });
        }
      });
  }
}
