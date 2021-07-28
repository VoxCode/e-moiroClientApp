import {ScheduleDate} from '../schedule-models/ScheduleDate';
import {ScheduleBlocksGenerator} from './ScheduleBlocksGenerator';

export class ScheduleDatesGenerator {
  constructor(
    public scheduleDate: ScheduleDate,
    public blocks: ScheduleBlocksGenerator[],
  ) {
  }
}
