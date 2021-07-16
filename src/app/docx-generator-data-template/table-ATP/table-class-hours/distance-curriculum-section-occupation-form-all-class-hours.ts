import {OccupationForm} from '../../../models/OccupationForm';
import {TrainingProgramCurriculumSectionGenerator} from '../../../models/generator-models/TrainingProgramCurriculumSectionGenerator';

export class DistanceCurriculumSectionOccupationFormAllClassHours {
  private classHoursList: number[] = [];
  constructor(
    private trainingProgramCurriculumSection: TrainingProgramCurriculumSectionGenerator,
    private occupationForms: OccupationForm[]
  ) {
    this.occupationForms.forEach(() => {
      this.classHoursList.push(0);
    });
    this.classHoursList.push(0);

    this.trainingProgramCurriculumSection.curriculumTopicTrainingPrograms.forEach(curriculumTopic => {
      if (!curriculumTopic.isVariable) {
        curriculumTopic.occupationFormClassHours.forEach(occupationFormClassHour => {
          const index = occupationForms.findIndex(a => a.id === occupationFormClassHour.occupationFormId);
          this.classHoursList[index] += occupationFormClassHour.classHours;
        });
      }
      this.classHoursList[occupationForms.length] += curriculumTopic.testWorkHours;
    });
  }

  public get curriculumSectionClassHours(): number[] {
    return this.classHoursList;
  }
}
