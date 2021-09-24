export class ScheduleElement {
  constructor(
    public scheduleBlockId?: number,
    public programName?: string,
    public programId?: number,
    public topic?: string,
    public teacher?: string,
    public teacherId?: number,
    public group?: string,
    public groupId?: number,
    public startTime?: Date,
    public endTime?: Date,
    public roomId?: number,
    public meta?: string,
  ) { }
}
