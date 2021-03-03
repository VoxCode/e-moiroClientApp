import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';

export class CurriculumSectionAllClassHours {
  private classHours = 0;
  constructor(
    private curriculumTopics: CurriculumTopicTrainingProgram[]
  ) { }

  public get curriculumSectionAllClassHours(): number {
    this.curriculumTopics.forEach(obj => {
      this.classHours += obj.classHours;
    });
    return this.classHours;
  }
}
