import {ScheduleTheme} from './table-schedule-theme';

export class ScheduleDataRow {

  public date: Date;
  public hours: string;
  public themes: ScheduleTheme[];

  constructor(date: Date, hours: string, themes: ScheduleTheme[] ) {
    this.date = date;
    this.themes = themes;
    this.hours = hours;
  }

  public static getDayOfTheWeek(day: Date): string {
    switch (day.getDay()) {
      case 1:
        return 'Понедельник';
      case 2:
        return 'Вторник';
      case 3:
        return 'Среда';
      case 4:
        return 'Четверг';
      case 5:
        return 'Пятница';
      case 6:
        return 'Суббота';
      case 7:
        return 'Воскресенье';
    }
  }
  public static getDayOfTheWeekBlR(day: Date): string{
      switch (day.getDay()) {
        case 1:
          return 'Панядзелак';
        case 2:
          return 'Аўторак';
        case 3:
          return 'Серада';
        case 4:
          return 'Чацвер';
        case 5:
          return 'Пятніца';
        case 6:
          return 'Субота';
        case 7:
          return 'Нядзеля';
      }
  }

  public calcRowSpan(): number {
    let rs;
    this.themes.forEach(t => {
      rs += t.calcRowSpan();
    });
    return this.themes.length + rs;
  }
}
