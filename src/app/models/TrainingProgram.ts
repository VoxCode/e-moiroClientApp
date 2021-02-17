export class TrainingProgram {
  constructor(
    public id?: number,
    public name?: string,
    public numberOfHours?: number,
    public isDistanceLearning?: boolean,
    public isControlWork?: boolean,
    public isTestWork?: boolean,
    public controlWork?: string,
    public departmentId?: number,
    public departmentName?: string,
    public studentCategoryId?: number,
    public studentCategoryName?: string,
    public certificationTypeId?: number,
    public certificationTypeName?: string,
    public formOfEducationId?: number,
    public formOfEducationName?: string){ }
}
