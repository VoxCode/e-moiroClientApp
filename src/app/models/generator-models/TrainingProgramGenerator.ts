import {TrainingProgram} from '../TrainingProgram';
import {TrainingProgramTestWork} from '../TrainingProgramTestWork';
import {TrainingProgramMainLiterature} from '../TrainingProgramMainLiterature';
import {TrainingProgramRegulation} from '../TrainingProgramRegulation';
import {TrainingProgramAdditionalLiterature} from '../TrainingProgramAdditionalLiterature';
import {TrainingProgramFinalExamination} from '../TrainingProgramFinalExamination';
import {TrainingProgramIntroduction} from '../TrainingProgramIntroduction';
import {TrainingProgramIndependentWorkQuestion} from '../TrainingProgramIndependentWorkQuestion';
import {TrainingProgramTeacher} from '../TrainingProgramTeacher';
import {TrainingProgramCurriculumSectionGenerator} from './TrainingProgramCurriculumSectionGenerator';

export class TrainingProgramGenerator extends TrainingProgram{
  constructor(
    public trainingProgramTestWork?: TrainingProgramTestWork,
    public trainingProgramMainLiteratures?: TrainingProgramMainLiterature[],
    public trainingProgramRegulations?: TrainingProgramRegulation[],
    public trainingProgramAdditionalLiteratures?: TrainingProgramAdditionalLiterature[],
    public trainingProgramFinalExaminations?: TrainingProgramFinalExamination[],
    public trainingProgramCurriculumSections?: TrainingProgramCurriculumSectionGenerator[],
    public trainingProgramIntroduction?: TrainingProgramIntroduction,
    public trainingProgramIndependentWorkQuestions?: TrainingProgramIndependentWorkQuestion[],
    public trainingProgramTeachers?: TrainingProgramTeacher[],
    ) {
    super();
  }
}
