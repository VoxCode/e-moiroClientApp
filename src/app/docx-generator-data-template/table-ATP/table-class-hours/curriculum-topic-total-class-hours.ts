import {OccupationForm} from '../../../models/OccupationForm';
import {CurriculumTopicTrainingProgramGenerator} from '../../../models/generator-models/CurriculumTopicTrainingProgramGenerator';

export class CurriculumTopicTotalClassHours {
  private totalClassHours = 0;
  private classHours: number[] = [];
  constructor(
    private occupationForms: OccupationForm[],
    private curriculumTopic: CurriculumTopicTrainingProgramGenerator) {

    occupationForms.forEach(() => {
      this.classHours.push(0);
    });

    curriculumTopic.occupationFormClassHours.forEach(obj => {
      const index = occupationForms.findIndex(a => a.id === obj.occupationFormId);
      this.classHours[index] += obj.classHours;
      this.totalClassHours += obj.classHours;
    });
  }

  public get ClassHours(): number[] {
    return this.classHours;
  }

  public get TotalClassHours(): number {
    return this.totalClassHours;
  }
}
