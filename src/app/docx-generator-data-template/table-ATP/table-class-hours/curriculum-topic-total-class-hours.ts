import {OccupationForm} from '../../../models/OccupationForm';
import {CurriculumTopicTrainingProgramGenerator} from '../../../models/generator-models/CurriculumTopicTrainingProgramGenerator';

export class CurriculumTopicTotalClassHours {
  private totalClassHours = 0;
  private classHours: number[] = [];
  constructor(
    private occupationForms: OccupationForm[],
    private curriculumTopic: CurriculumTopicTrainingProgramGenerator,
    private isDistance?: boolean) {

    occupationForms.forEach(() => {
      this.classHours.push(0);
    });
    if (isDistance) {
      this.classHours.push(0);
    }
    curriculumTopic.occupationFormClassHours.forEach(obj => {
      const index = occupationForms.findIndex(a => a.id === obj.occupationFormId);
      this.classHours[index] += obj.classHours;
      this.totalClassHours += obj.classHours;
    });
    if (isDistance) {
      this.classHours[occupationForms.length] = curriculumTopic.testWorkHours;
      this.totalClassHours += curriculumTopic.testWorkHours;
    }
  }

  public get ClassHours(): number[] {
    return this.classHours;
  }

  public get TotalClassHours(): number {
    return this.totalClassHours;
  }
}
