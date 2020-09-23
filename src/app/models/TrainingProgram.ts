export class TrainingProgram {
  constructor(
    public id?: number,
    public name?: string,
    public numberOfHours?: number,
    public isDistanceLearning?: boolean,
    public isIndependentWork?: boolean,
    public isTestWork?: boolean,
    public IndependentWork?: string,
    public departmentId?: number,
    public studentCategoryId?: number,
    public certificationTypeId?: number){ }
}
