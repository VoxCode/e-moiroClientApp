export class ScheduleElement {
  constructor(
    public id?: number,
    public program?: string,
    public topic?: string,
    public teacher?: string,
    public group?: string,
    public startTime?: Date,
    public endTime?: Date,
    public roomId?: number,
    public meta?: string,
  ) { }
}
