import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';
import {CurriculumSectionOccupationFormAllClassHours} from './curriculum-section-occupation-form-all-class-hours';

export class TrainingProgramOccupationFormAllClassHours {
  private classHoursList: number[] = [];
  constructor(
    private curriculumTopicsList: CurriculumTopicTrainingProgram[][],
    private occupationForms: OccupationForm[]
  ) {
    this.occupationForms.forEach(obj => {
      this.classHoursList.push(0);
    });
    this.curriculumTopicsList.forEach(obj => {
      const tmpCurriculumSectionOccupationFormAllClassHours = new CurriculumSectionOccupationFormAllClassHours(obj, occupationForms);
      const tmpClassHoursList = tmpCurriculumSectionOccupationFormAllClassHours.curriculumSectionAllClassHours;
      tmpClassHoursList.forEach((object, index) => {
        this.classHoursList[index] += object;
      });
    });
  }

  public get getTrainingProgramAllClassHours(): number[] {
    return this.classHoursList;
  }
}
