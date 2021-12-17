export class ScheduleElement {
  constructor(
    public id?: number,
    public scheduleBlockId?: number,
    public topic?: string,
    public topicId?: number,
    public teacher?: string,
    public teacherId?: number,
    public group?: number,
    public groupId?: number,
    public startTime?: Date,
    public endTime?: Date,
    public room?: string,
    public roomId?: number,
    public metaData?: string,
  ) { }
}
