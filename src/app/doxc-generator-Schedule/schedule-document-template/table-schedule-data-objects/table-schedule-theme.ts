import {ScheduleTeacher} from './table-schedule-teacher';

export class ScheduleTheme {
  public name: string;
  public teachers: ScheduleTeacher[];


  constructor(name: string, teachers: ScheduleTeacher[]) {
    this.name = name;
    this.teachers = teachers;
  }

  public calcRowSpan(): number {
    let rs = 0;
    this.teachers.forEach(t => {
      rs += t.calcRowSpan();
    });
    return this.teachers.length + rs;
  }
}
