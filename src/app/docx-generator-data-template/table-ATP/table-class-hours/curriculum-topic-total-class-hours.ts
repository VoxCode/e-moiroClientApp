import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {OccupationForm} from '../../../models/OccupationForm';

export class CurriculumTopicTotalClassHours {
  private classHours: string[] = [];
  private totalClassHours = 0;
  constructor(
    private occupationForms: OccupationForm[],
    private curriculumTopic: CurriculumTopicTrainingProgram) {
    let j = 0;
    occupationForms.forEach(obj => {
        let tmp: string;
        tmp = this.curriculumTopicClassHours(obj.id, curriculumTopic);
        if (tmp !== '') {
          this.totalClassHours = j;
        }
        this.classHours.push(tmp);
        j++;
    });
  }

  public get getTotalClassHours(): number {
    return this.totalClassHours;
  }

  public get getClassHours(): string[] {
    return this.classHours;
  }

  private curriculumTopicClassHours(
    occupationFormId: number, curriculumTopic: CurriculumTopicTrainingProgram): string {
    if (occupationFormId === curriculumTopic.occupationFormId) {
      return curriculumTopic.classHours.toString();
    }
    else {
      return '';
    }
  }
}
