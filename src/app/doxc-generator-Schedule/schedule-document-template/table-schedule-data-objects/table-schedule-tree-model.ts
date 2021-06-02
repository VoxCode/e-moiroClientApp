export class ScheduleRowTree {

  constructor(private fields: string[], private subs: ScheduleRowTree[]) {

  }

  public get getFields(): string[]{
    return this.fields;
  }
  public get getSubs(): ScheduleRowTree[]{
    return this.subs;
  }

  public calcRowSpan(): number {
    if (this.subs.length < 1) {
      return 1;
    }
    let rs = 0;
    this.subs.forEach(sub => {
      rs += sub.calcRowSpan();
    });
    return rs;
  }
}
