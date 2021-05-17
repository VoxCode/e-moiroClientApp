import {MaxVariableTopicTime} from './MaxVariableTopicTime';

export class OccupationForm extends MaxVariableTopicTime{
  constructor(
    public id?: number,
    public fullName?: string,
    public pluralName?: string){
    super();
  }
}
