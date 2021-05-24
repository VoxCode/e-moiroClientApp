import {OccupationForm} from '../../../models/OccupationForm';
import {TrainingProgramCurriculumSectionGenerator} from '../../../models/generator-models/TrainingProgramCurriculumSectionGenerator';

export class CurriculumSectionOccupationFormAllClassHours {
  private classHoursList: number[] = [];
  private invariantClassHoursList: number[] = [];
  private variableClassHoursList: number[] = [];
  constructor(
    private trainingProgramCurriculumSection: TrainingProgramCurriculumSectionGenerator,
    private occupationForms: OccupationForm[]
  ) {
    this.occupationForms.forEach(() => {
      this.classHoursList.push(0);
      this.invariantClassHoursList.push(0);
      this.variableClassHoursList.push(0);
    });
    this.trainingProgramCurriculumSection.curriculumTopicTrainingPrograms.forEach(curriculumTopic => {
      if (!curriculumTopic.isVariable) {
        curriculumTopic.occupationFormClassHours.forEach(occupationFormClassHour => {
          const index = occupationForms.findIndex(a => a.id === occupationFormClassHour.occupationFormId);
          this.classHoursList[index] += occupationFormClassHour.classHours;
          this.invariantClassHoursList[index] += occupationFormClassHour.classHours;
        });
      }
    });
    if (this.trainingProgramCurriculumSection.maxVariableTopicTimes.length !== 0) {
      this.trainingProgramCurriculumSection.maxVariableTopicTimes.forEach(obj => {
        const index = occupationForms.findIndex(a => a.id === obj.occupationFormId);
        this.classHoursList[index] += obj.maxVariableTopicHours;
        this.variableClassHoursList[index] += obj.maxVariableTopicHours;
      });
    }
  }

  public get curriculumSectionClassHours(): number[] {
    return this.classHoursList;
  }

  public get invariantClassHours(): number[] {
    return this.invariantClassHoursList;
  }

  public get variableClassHours(): number[] {
    return this.variableClassHoursList;
  }
}
