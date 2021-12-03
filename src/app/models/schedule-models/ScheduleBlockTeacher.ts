export class ScheduleBlockTeacher {
  constructor(
    public id?: number,
    public teacherId?: number,
    public scheduleBlockId?: number,
    public serialNumber?: number,
    public firstName?: string,
    public lastName?: string,
    public patronymicName?: string,
    public fullNameForm?: string,
    public position?: string,
    ){ }

  // getter just won't work. dunno why
  //   public get FullTeacherNameAndPosition(): string {
  //     return `${this.lastName} ${this.firstName} ${this.patronymicName} (${this.position})`;
  // }

  // not a function, same shit different day
    // public FullTeacherNameAndPosition(): string {
    //     return `${this.lastName} ${this.firstName} ${this.patronymicName} (${this.position})`;
    // }

}
