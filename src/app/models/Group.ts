export class Group {
  constructor(
    public id?: number,
    public groupNumber?: number,
    public calendarYear?: string,
    public theTopicOfContinuingEducation?: string,
    public classStartDate?: string,
    public classEndDate?: string,
    public numberOfHours?: number,
    public formOfEducationId?: number,
    public teacherCategoryId?: number,
    public departmentId?: number){ }
}
