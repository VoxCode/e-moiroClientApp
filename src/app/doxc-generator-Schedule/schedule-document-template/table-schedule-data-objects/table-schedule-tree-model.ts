import {ScheduleTheme} from './table-schedule-theme';

export class ScheduleRowTree {

  constructor(private fields: string[], private subs: any[]) {

  }

 public get getFields(): string[]{
    return this.fields;
 }
  public get getSubs(): any[]{
    return this.subs;
  }

  public calcRowSpan(): number {
    if (this.subs === undefined) {
      return 1;
    }
    const rs = 0;
    // this.subs.forEach(sub => {
    //   rs += sub.calcRowSpan();
    // });
    return rs;
  }
}
