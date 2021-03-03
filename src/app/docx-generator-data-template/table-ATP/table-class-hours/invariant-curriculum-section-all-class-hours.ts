import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';

export class InvariantCurriculumSectionAllClassHours {
  private classHours = 0;
  constructor(
    private curriculumTopics: CurriculumTopicTrainingProgram[]
  ) { }

  public get curriculumSectionAllClassHours(): number {
    this.curriculumTopics.forEach(obj => {
      if (!obj.isVariable) {
        this.classHours += obj.classHours;
      }
    });
    return this.classHours;
  }
}
