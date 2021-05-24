import {OccupationForm} from '../../../models/OccupationForm';
import {CurriculumSectionOccupationFormAllClassHours} from './curriculum-section-occupation-form-all-class-hours';
import {TrainingProgramCurriculumSectionGenerator} from '../../../models/generator-models/TrainingProgramCurriculumSectionGenerator';

export class TrainingProgramOccupationFormAllClassHours {
  private classHoursList: number[] = [];
  constructor(
    private trainingProgramCurriculumSection: TrainingProgramCurriculumSectionGenerator,
    private occupationForms: OccupationForm[]
  ) {
    this.occupationForms.forEach(obj => {
      this.classHoursList.push(0);
    });
    this.trainingProgramCurriculumSection.curriculumTopicTrainingPrograms.forEach(obj => {
      const tmpCurriculumSectionOccupationFormAllClassHours = new CurriculumSectionOccupationFormAllClassHours(obj, occupationForms);
      // const tmpClassHoursList = tmpCurriculumSectionOccupationFormAllClassHours.curriculumSectionAllClassHours;
      // tmpClassHoursList.forEach((object, index) => {
      //   this.classHoursList[index] += object;
      // });
    });
  }

  public get getTrainingProgramAllClassHours(): number[] {
    return this.classHoursList;
  }
}
