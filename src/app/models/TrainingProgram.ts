export class TrainingProgram {
  constructor(
    public id?: number,
    public name?: string,
    public numberOfHours?: number,
    public numberOfWeeks?: number,
    public isDistanceLearning?: boolean,
    public isControlWork?: boolean,
    public isTestWork?: boolean,
    public departmentId?: number,
    public departmentName?: string,
    public studentCategoryId?: number,
    public studentCategoryName?: string,
    public certificationTypeId?: number,
    public certificationTypeName?: string,
    public formOfEducationId?: number,
    public formOfEducationName?: string,
    public departmentHeadName?: string,
    public studentCategoryGenitiveName?: string,
    public dateOfCreation?: Date){ }
}
