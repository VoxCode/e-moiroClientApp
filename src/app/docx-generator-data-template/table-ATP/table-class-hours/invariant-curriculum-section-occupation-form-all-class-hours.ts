import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';

export class InvariantCurriculumSectionOccupationFormAllClassHours {
  private classHoursList: number[] = [];
  constructor(
    private curriculumTopics: CurriculumTopicTrainingProgram[],
    private occupationForms: OccupationForm[]
  ) { }

  public get curriculumSectionAllClassHours(): number[] {
    this.occupationForms.forEach((occupationForm, index) => {
      let classHours = 0;
      this.curriculumTopics.forEach(curriculumTopic => {
        if (occupationForm.id === curriculumTopic.occupationFormId && !curriculumTopic.isVariable) {
          classHours += curriculumTopic.classHours;
          this.classHoursList[index] = classHours;
        }
        if (!this.classHoursList[index]) {
          this.classHoursList[index] = 0;
        }
      });
    });
    return this.classHoursList;
  }
}
