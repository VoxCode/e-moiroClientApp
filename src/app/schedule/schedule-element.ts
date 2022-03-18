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
    public subgroup?: number,
    public date?: Date,
    public startTime?: Date,
    public endTime?: Date,
    public timeId?: number,
    public room?: string,
    public roomId?: number,
    public metaData?: string,
  ) { }
}
