import {TrainingProgramCurriculumSection} from '../TrainingProgramCurriculumSection';
import {CurriculumTopicTrainingProgramGenerator} from './CurriculumTopicTrainingProgramGenerator';
import {MaxVariableTopicTime} from '../MaxVariableTopicTime';

export class TrainingProgramCurriculumSectionGenerator extends TrainingProgramCurriculumSection{
  constructor(
    public curriculumTopicTrainingPrograms?: CurriculumTopicTrainingProgramGenerator[],
    public maxVariableTopicTimes?: MaxVariableTopicTime[]) {
    super();
  }
}
