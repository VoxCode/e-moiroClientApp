export class ScheduleElement {
  constructor(
    public id?: number,
    public scheduleBlockId?: number,
    public topic?: string,
    public topicId?: number,
    public teacher?: { id?: number, firstName?: string, lastName?: string, patronymicName?: string, position?: string, },
    public time?: {
      id?: number, classTimeStart?: Date, classTimeEnd?: Date,
      secondTimeStart?: Date, secondTimeEnd?: Date,
      shift?: number, dayOfTheWeek?: number
    },
    public group?: number,
    public groupId?: number,
    public subgroup?: number,
    public date?: Date,
    public dateId?: number,
    // public startTime?: Date,
    // public endTime?: Date,
    // public timeId?: number,
    public room?: string,
    public roomId?: number,
    public metaData?: string,
  ) {
  }
}
