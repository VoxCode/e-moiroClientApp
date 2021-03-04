import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {CurriculumSectionAllClassHours} from './curriculum-section-all-class-hours';

export class TrainingProgramAllClassHours {
  private classHours = 0;
  constructor(
    private curriculumTopicsList: CurriculumTopicTrainingProgram[][]
  ) {
    this.curriculumTopicsList.forEach(obj => {
      const tmpCurriculumTopic = new CurriculumSectionAllClassHours(obj);
      this.classHours += tmpCurriculumTopic.curriculumSectionAllClassHours;
    });
  }

  public get getTrainingProgramAllClassHours(): number {
    return this.classHours;
  }
}
