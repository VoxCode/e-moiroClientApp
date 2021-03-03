import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';

export class VariableCurriculumSectionOccupationFormAllClassHours {
  private classHoursList: number[] = [];
  constructor(
    private curriculumTopics: CurriculumTopicTrainingProgram[],
    private occupationForms: OccupationForm[]
  ) { }

  public get curriculumSectionAllClassHours(): number[] {
    this.occupationForms.forEach((occupationForm, index) => {
      let classHours = 0;
      this.curriculumTopics.forEach(curriculumTopic => {
        if (occupationForm.id === curriculumTopic.occupationFormId && curriculumTopic.isVariable) {
          classHours += curriculumTopic.classHours;
          this.classHoursList[index] = classHours;
        }
      });
    });
    return this.classHoursList;
  }
}
