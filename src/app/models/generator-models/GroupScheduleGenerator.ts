import {TrainingProgram} from '../TrainingProgram';
import {Group} from '../Group';
import {ScheduleDate} from '../schedule-models/ScheduleDate';
import {ScheduleDateScheduleBlock} from '../schedule-models/ScheduleDateScheduleBlock';
import {ScheduleBlockTeacher} from '../schedule-models/ScheduleBlockTeacher';
import {ScheduleBlock} from '../schedule-models/ScheduleBlock';
import {ScheduleBlockCurriculumTopicTrainingProgram} from '../schedule-models/ScheduleBlockCurriculumTopicTrainingProgram';
import {ScheduleBlockClassTime} from '../schedule-models/ScheduleBlockClassTime';
import {ClassTime} from '../schedule-models/СlassTime';
import {ScheduleBlockClassRoom} from '../schedule-models/ScheduleBlockClassRoom';
import {ClassRoom} from '../schedule-models/ClassRoom';

export class GroupScheduleGenerator extends Group{
  constructor(
    public trainingProgram?: TrainingProgram,
    public scheduleDate?: ScheduleDate[],
    public scheduleDateScheduleBlock?: ScheduleDateScheduleBlock[],
    public scheduleBlockTeacher?: ScheduleBlockTeacher[],
    public scheduleBlock?: ScheduleBlock[],
    public scheduleBlockCurriculumTopicTrainingProgram?: ScheduleBlockCurriculumTopicTrainingProgram[],
    public scheduleBlockClassTime?: ScheduleBlockClassTime[],
    public classTime?: ClassTime[],
    public scheduleBlockClassRoom?: ScheduleBlockClassRoom[],
    public classRoom?: ClassRoom[],
  ) {
    super();
  }
}
