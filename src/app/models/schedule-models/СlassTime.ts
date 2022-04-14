export class ClassTime {
  constructor(
    public id?: number,
    public classTimeStart?: Date,
    public classTimeEnd?: Date,
    public secondTimeStart?: Date,
    public secondTimeEnd?: Date,
    public shift?: number,
    public dayOfTheWeek?: number){ }
}
