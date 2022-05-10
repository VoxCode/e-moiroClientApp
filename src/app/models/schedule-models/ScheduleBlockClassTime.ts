export class ScheduleBlockClassTime {
  constructor(
    public id?: number,
    public scheduleBlockId?: number,
    public classTimeId?: number,
    public classTimeStart?: Date,
    public classTimeEnd?: Date,
    public secondTimeStart?: Date,
    public secondTimeEnd?: Date,
    public shift?: number,
    public dayOfTheWeek?: number,
    public serialNumber?: number){ }
}
