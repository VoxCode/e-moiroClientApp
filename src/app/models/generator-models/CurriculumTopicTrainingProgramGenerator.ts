import {CurriculumTopicTrainingProgram} from '../СurriculumTopicTrainingProgram';
import {OccupationFormClassHour} from '../OccupationFormClassHour';

export class CurriculumTopicTrainingProgramGenerator extends CurriculumTopicTrainingProgram{
  constructor(
    public occupationFormClassHours?: OccupationFormClassHour[]) {
    super();
  }
}
