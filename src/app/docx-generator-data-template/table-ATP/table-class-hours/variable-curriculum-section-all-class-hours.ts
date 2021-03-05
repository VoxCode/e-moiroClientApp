import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';

export class VariableCurriculumSectionAllClassHours {
  private classHours = 0;
  constructor(
    private curriculumTopics: CurriculumTopicTrainingProgram[]
  ) {
    this.curriculumTopics.forEach(obj => {
      if (obj.isVariable) {
        this.classHours += obj.classHours;
      }
    });
  }

  public get curriculumSectionAllClassHours(): number {
    return this.classHours;
  }
}
