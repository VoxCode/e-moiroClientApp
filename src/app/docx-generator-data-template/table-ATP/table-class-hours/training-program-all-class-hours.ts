import {TotalClassHours} from './total-class-hours';
import {TrainingProgramCurriculumSectionGenerator} from '../../../models/generator-models/TrainingProgramCurriculumSectionGenerator';

export class TrainingProgramAllClassHours {
  private classHours = 0;
  constructor(
    private trainingProgramCurriculumSections: TrainingProgramCurriculumSectionGenerator[],
  ) {
    // this.trainingProgramCurriculumSections.forEach(obj => {
    //   const tmpCurriculumTopic = new TotalClassHours(obj.curriculumTopicTrainingPrograms);
    //   this.classHours += tmpCurriculumTopic.curriculumSectionAllClassHours;
    // });
  }

  public get getTrainingProgramAllClassHours(): number {
    return this.classHours;
  }
}
