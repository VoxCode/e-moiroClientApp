import {TeachingPosition} from './TeachingPosition';

export class Teacher {
  constructor(
    public id?: number,
    public name?: string,
    public isCathedral?: boolean,
    public teachingPositionId?: number,
    public teachingPosition?: Array <TeachingPosition>){ }
}
