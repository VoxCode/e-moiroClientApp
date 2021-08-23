export class ScheduleBlockClassTime {
  constructor(
    public id?: number,
    public scheduleBlockId?: number,
    public classTimeId?: number,
    public classTimeStart?: Date,
    public classTimeEnd?: Date,
    public serialNumber?: number){ }
}
