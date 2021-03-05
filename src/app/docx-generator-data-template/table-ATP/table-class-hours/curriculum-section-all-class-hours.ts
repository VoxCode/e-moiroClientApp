import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';

export class CurriculumSectionAllClassHours {
  private classHours = 0;
  constructor(
    private curriculumTopics: CurriculumTopicTrainingProgram[]
  ) {
    this.curriculumTopics.forEach(obj => {
      this.classHours += obj.classHours;
    });
  }

  public get curriculumSectionAllClassHours(): number {

    return this.classHours;
  }
}
