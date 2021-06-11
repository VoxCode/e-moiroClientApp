import {TrainingProgram} from '../TrainingProgram';
import {Group} from '../Group';
import {ScheduleDate} from '../Schedule/ScheduleDate';
import {ScheduleDateScheduleBlock} from '../Schedule/ScheduleDateScheduleBlock';
import {ScheduleBlockTeacher} from '../Schedule/ScheduleBlockTeacher';
import {ScheduleBlock} from '../Schedule/ScheduleBlock';
import {ScheduleBlockCurriculumTopicTrainingProgram} from '../Schedule/ScheduleBlockCurriculumTopicTrainingProgram';
import {ScheduleBlockClassTime} from '../Schedule/ScheduleBlockClassTime';
import {ClassTime} from '../Schedule/СlassTime';
import {ScheduleBlockClassRoom} from '../Schedule/ScheduleBlockClassRoom';
import {ClassRoom} from '../Schedule/ClassRoom';

export class GroupScheduleGenerator extends Group{
  constructor(
    public trainingProgram?: TrainingProgram,
    public scheduleDate?: ScheduleDate,
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
