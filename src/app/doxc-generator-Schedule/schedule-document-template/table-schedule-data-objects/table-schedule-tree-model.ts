import {BorderStyle, ITableBordersOptions} from 'docx';

export class ScheduleRowTree {


  // tslint:disable-next-line:variable-name
  private _style: ITableBordersOptions;

  constructor(private fields: string[], private subs: ScheduleRowTree[]) {

  }

  public get getFields(): string[]{
    return this.fields;
  }
  public get getSubs(): ScheduleRowTree[]{
    return this.subs;
  }
  get style(): ITableBordersOptions {
    return this._style;
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

  public generateSubsStyle(lvl: number = 0, currentIndex: number = 0): void{
    this.subs.forEach((sub, index) => {
      sub.generateSubsStyle(lvl + 1, index);
    });
    if (lvl > 0) {
      if (currentIndex > 0) {
        this._style = {top: {style: BorderStyle.DASH_SMALL_GAP, size: 5, color: '000000'}};
      }
    }
  }



}
