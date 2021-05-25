import {OccupationForm} from './OccupationForm';

export class MaxVariableTopicTime extends OccupationForm{
  constructor(
    public occupationFormId?: number,
    public trainingProgramCurriculumSectionId?: number,
    public maxVariableTopicHours?: number){
    super();
  }
}
