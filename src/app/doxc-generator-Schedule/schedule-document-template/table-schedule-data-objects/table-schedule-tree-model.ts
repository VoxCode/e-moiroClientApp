import {ScheduleTheme} from './table-schedule-theme';

export class ScheduleRowTree {

  constructor(private fields: string[], private subs: ScheduleRowTree[]) {

  }

  public get getFields(): string[]{
    return this.fields;
  }
  public get getSubs(): ScheduleRowTree[]{
    return this.subs;
  }

  public cal(): number {
    if (this.subs === undefined) {
      return 1;
    }
    else {
      return 0;
    }
  }

  public calcRowSpan(): number {
    if (this.subs === undefined) {
      return 1;
    }
    else {
      const rs = 0;
      // this.subs.forEach(sub => {
      //   rs += sub.calcRowSpan();
      // });
      return rs;
    }
  }
}
