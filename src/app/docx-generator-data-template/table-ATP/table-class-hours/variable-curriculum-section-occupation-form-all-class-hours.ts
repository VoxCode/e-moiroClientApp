import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';

export class VariableCurriculumSectionOccupationFormAllClassHours {
  private classHoursList: number[] = [];
  constructor(
    private curriculumTopics: CurriculumTopicTrainingProgram[],
    private occupationForms: OccupationForm[]
  ) {
    this.occupationForms.forEach((occupationForm, index) => {
      let classHours = 0;
      this.curriculumTopics.forEach(curriculumTopic => {
        if (occupationForm.id === curriculumTopic.occupationFormId && curriculumTopic.isVariable) {
          classHours += curriculumTopic.classHours;
          this.classHoursList[index] = classHours;
        }
        if (!this.classHoursList[index]) {
          this.classHoursList[index] = 0;
        }
      });
    });
  }

  public get curriculumSectionAllClassHours(): number[] {
    return this.classHoursList;
  }
}
