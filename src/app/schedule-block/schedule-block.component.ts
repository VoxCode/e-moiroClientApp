import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ScheduleBlockCurriculumTopicTrainingProgramService} from '../services/schedule-services/schedule-block-curriculum-topic-training-program.service';
import {MDBModalRef} from 'angular-bootstrap-md';
import {ScheduleBlockCurriculumTopicTrainingProgram} from '../models/schedule-models/ScheduleBlockCurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {ScheduleBlockTeacher} from '../models/schedule-models/ScheduleBlockTeacher';
import {ScheduleBlockTeacherService} from '../services/schedule-services/schedule-block-teacher.service';
import {TrainingProgramTeacherService} from '../services/training-program-teacher.service';
import {TrainingProgramTeacher} from '../models/TrainingProgramTeacher';
import {TeacherService} from '../services/teacher.service';
import {Teacher} from '../models/Teacher';
import {Group} from '../models/Group';
import {GroupService} from '../services/group.service';
import {ClassRoom} from '../models/schedule-models/ClassRoom';
import {ScheduleBlock} from '../models/schedule-models/ScheduleBlock';
import {ScheduleBlockService} from '../services/schedule-services/schedule-block.service';
import {ScheduleBlockClassTime} from '../models/schedule-models/ScheduleBlockClassTime';
import {ScheduleBlockClassRoom} from '../models/schedule-models/ScheduleBlockClassRoom';
import {ScheduleBlockClassRoomService} from '../services/schedule-services/schedule-block-class-room.service';
import {ScheduleBlockClassTimeService} from '../services/schedule-services/schedule-block-class-time.service';
import {ScheduleElement} from '../schedule/schedule-element';
import {ClassTime} from '../models/schedule-models/СlassTime';
import {TimelineMonthService, TimelineViewsService} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-schedule-block',
  templateUrl: './schedule-block.component.html',
  styleUrls: ['./schedule-block.component.scss'],
  providers: [
    ScheduleBlockService,
    ScheduleBlockCurriculumTopicTrainingProgramService,
    CurriculumTopicTrainingProgramService,
    TrainingProgramCurriculumSectionService,
    ScheduleBlockTeacherService,
    TrainingProgramTeacherService,
    TeacherService,
    GroupService,
    ScheduleBlockClassRoomService,
    ScheduleBlockClassTimeService, TimelineViewsService, TimelineMonthService],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleBlockComponent implements OnInit {

  public selectedGroup: Group;
  public selectedTopic: CurriculumTopicTrainingProgram;
  public selectedTopicAux: CurriculumTopicTrainingProgram;
  public selectedTeacher: Teacher;
  public selectedTeacherAux: Teacher;
  public selectedRoom: ClassRoom;
  public selectedRoomAux: ClassRoom;

  groupValid = false;
  groupTouched: boolean;
  teacherValid = false;
  teacherTouched: boolean;
  topicValid = false;
  topicTouched: boolean;
  roomValid = false;
  roomTouched: boolean;

  public combineTopic = false;
  public combineRoom = false;
  public combineTeacher = false;

  public divideSubGroups = false;
  @Input() scheduleElement: ScheduleElement;
  @Input() elementData: { [key: string]: any };
  @Input() rooms: ClassRoom[] = [];
  teachers: Teacher[] = [];
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];
  groups: Group[] = [];

  public roomFields: Object = { text: 'name', value: 'id' };


  constructor(
    private scheduleBlockCurriculumTopicTrainingProgramService: ScheduleBlockCurriculumTopicTrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private scheduleBlockTeacherService: ScheduleBlockTeacherService,
    private trainingProgramTeacherService: TrainingProgramTeacherService,
    private teacherService: TeacherService,
    private groupService: GroupService,
    private scheduleBlockService: ScheduleBlockService,
    private scheduleBlockClassRoomService: ScheduleBlockClassRoomService,
    private scheduleBlockClassTimeService: ScheduleBlockClassTimeService,
  ) { }

  ngOnInit(): void {
    console.log('editor init');
    console.log(this.elementData);
    this.selectedRoom = this.rooms.filter(u => u.id >= this.elementData.roomId)[0];
    this.loadGroups();
    this.loadCurriculumTopics();
    this.loadTeachers();

  }

  public dateParser(data: string) {
    return new Date(data);
  }


  loadGroups(): void{
    this.groupService.getValues()
      .subscribe((data: Group[]) => {
        if (data.length > 0){
          this.groups = data;
          this.selectedGroup = this.groups.filter(u => u.id >= this.elementData.groupId)[0];
        }
      });
  }



  loadCurriculumTopics(): void{
    this.curriculumTopicTrainingProgramService.getValues()
      .subscribe((topicsData: CurriculumTopicTrainingProgram[]) => {
        if (topicsData.length > 0) {
          this.curriculumTopicTrainingPrograms = topicsData;
          this.selectedTopic = this.curriculumTopicTrainingPrograms.filter(u => u.id >= this.elementData.topicId)[0];
        }
      });
  }

  loadTeachers(): void {
    this.teacherService.getValues()
      .subscribe((teachersData: Teacher[]) => {
        if (teachersData.length > 0) {
          teachersData.forEach((teacher: Teacher) => {
            teacher.fullNameForm = teacher.lastName + ' ' + teacher.firstName + ' ' +
              teacher.patronymicName + ' (' + teacher.position + ')';
            this.teachers.push(teacher);
          });
          this.selectedTeacher = this.teachers.filter(u => u.id >= this.elementData.teacherId)[0];
        }
      });
  }


  MergeWithSubGroup(val: string, checked: boolean = true): void {
    switch (val) {
      case 'divideSubGroups':
        this.divideSubGroups = checked;
        this.combineTopic = checked;
        this.combineRoom = checked;
        this.combineTeacher = checked;
        break;
      case 'combineTopic':
        this.combineTopic = !this.combineTopic;
        break;
      case 'combineRoom':
        this.combineRoom = !this.combineRoom;
        break;
      case 'combineTeacher':
        this.combineTeacher = !this.combineTeacher;
        break;
    }
  }

  validateForm(): void {
    if (this.groupValid && this.roomValid && this.teacherValid && this.topicValid) {
      this.elementData.metaData = 'Valid';
    }
  }

  touchGroup(): void {
    this.groupTouched = true;
    this.validateGroup();
  }

  validateGroup(): void {
    if (this.selectedGroup !== undefined)
    {
      this.groupValid = true;
      this.selectGroup();
      this.validateForm();
    }
    else
    {
      this.groupValid = false;
    }
  }

  touchTopic(): void{
    this.topicTouched = true;
    this.validateTopic();
  }

  validateTopic(): void {
    if (this.selectedTopic !== undefined)
    {
      this.topicValid = true;
      this.selectTopic();
      this.validateForm();
    }
    else
    {
      this.topicValid = false;
    }
  }

  touchRoom(): void{
    this.roomTouched = true;
    this.validateRoom();
  }

  validateRoom(): void {
    if (this.selectedRoom !== undefined)
    {
      this.roomValid = true;
      this.selectRoom();
      this.validateForm();
    }
    else
    {
      this.roomValid = false;
    }
  }

  touchTeacher(): void{
    this.teacherTouched = true;
    this.validateTeacher();
  }

  validateTeacher(): void {
    if (this.selectedTeacher !== undefined)
    {
      this.teacherValid = true;
      this.selectTeacher();
      this.validateForm();
    }
    else
    {
      this.teacherValid = false;
    }
  }

  selectTeacher(): void {
    this.elementData.teacherId = this.selectedTeacher.id;
    this.elementData.teacher = this.selectedTeacher.fullNameForm;
  }

  selectTopic(): void {
    this.elementData.topicId = this.selectedTopic.id;
    this.elementData.topic = this.selectedTopic.topicTitle;
  }

  selectRoom(): void {
    this.elementData.roomId = this.selectedRoom.id;
    this.elementData.room = this.selectedRoom.name;
  }

  selectGroup(): void {
    this.elementData.group = this.selectedGroup.groupNumber;
    this.elementData.groupId = this.selectedGroup.id;
  }
}

