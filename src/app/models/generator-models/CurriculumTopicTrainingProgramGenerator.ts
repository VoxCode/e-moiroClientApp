import {CurriculumTopicTrainingProgram} from '../СurriculumTopicTrainingProgram';
import {OccupationFormClassHour} from '../OccupationFormClassHour';
import {GuidedTestWorkAssignment} from '../GuidedTestWorkAssignment';

export class CurriculumTopicTrainingProgramGenerator extends CurriculumTopicTrainingProgram{
  constructor(
    public occupationFormClassHours?: OccupationFormClassHour[],
    public guidedTestWorkAssignments?: GuidedTestWorkAssignment[]) {
    super();
  }
}
