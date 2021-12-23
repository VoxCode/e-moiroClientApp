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
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

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

  // public StartDate

  // public form: FormGroup = new FormGroup({
  //   groupNumber: new FormControl('', Validators.required),
  //   topic: new FormControl('', Validators.required),
  //   teacher: new FormControl('', Validators.required),
  //   room: new FormControl('', Validators.required),
  // });
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

  tempClassTime: ScheduleBlockClassTime;

  public roomFields: Object = { text: 'name', value: 'id' };
  public topicFields: Object = { text: 'topicTitle', value: 'id' };
  public teacherFields: Object = { text: 'teacherFullNameForm', value: 'id' };
  public groupFields: Object = { text: 'groupNumber', value: 'id' };

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
    if (this.elementData.topic === undefined){

    }
    this.selectedTopic = this.elementData.topic;
    this.selectedTeacher = this.elementData.teacher;
    this.selectedGroup = this.elementData.group;
    this.selectedRoom = this.elementData.room;
    // this.form.controls.groupNumber.patchValue(this.selectedGroup.groupNumber);
    // this.form.controls.topic.patchValue(this.selectedTopic.topicTitle);
    // this.form.controls.teacher.patchValue(this.selectedTeacher.fullNameForm);
    // this.form.controls.room.patchValue(this.selectedRoom.name);
    // this.elementData = {
    //   id: 2,
    //   programId: 1,
    //   topicTitle: 'topic2',
    //   teacherId: 1,
    //   teacherFullName: 'teacher2',
    //   description: 'description2',
    //   startTime: new Date(2021, 11, 14, 9, 0),
    //   endTime: new Date(2021, 11, 14, 11, 0),
    //   groupId: 1,
    //   groupNumber: 'gr2',
    //   roomId: new Array(1)[3],
    //   roomName:'room2',
    //   metaData: 'wabba-labba-dub-dub2',
    // };
    // console.log(this.scheduleElement);
    this.loadGroups();
    //  this.loadScheduleBlockCurriculumTopics();
    this.loadCurriculumTopicTrainingPrograms();
    this.loadTrainingProgramTeachers();

  }

  // get groupNumber(): AbstractControl { return this.form.get('groupNumber'); }




  public dateParser(data: string) {
    return new Date(data);
  }

  public getResourceValue(data: { [key: string]: Object }) {
    console.log('lololololololo');
    if (data && Object.keys(data).length > 0) {
      this.elementData.room = data.name;
      return data.roomId;
      console.log(data);
    }
  }

  createBlock(el: any): void{
    const block = new ScheduleBlock(0, 1, 0);
    this.scheduleBlockService.createValue(block)
      .subscribe((blockResponse: ScheduleBlock) => {
        this.createBlockTopic(blockResponse.id, this.selectedTopic.id);
        this.createBlockClassRoom(blockResponse.id, this.scheduleElement.roomId);
        this.loadScheduleBlockClassTime(this.scheduleElement.startTime, this.scheduleElement.endTime);
        this.createBlockClassTime(blockResponse.id, this.tempClassTime.id);
        this.createBlockTeacher(blockResponse.id, this.selectedTeacher.id);
    });
  }
  createBlockClassTime(blockId: number, timeID: number): void{
    const blockClassTime  = new ScheduleBlockClassTime();
    this.scheduleBlockClassTimeService.createValue(blockClassTime)
      .subscribe((response: ScheduleBlockClassRoom) => {
        // nothing
      });
  }
  createBlockClassRoom(blockId: number, roomId: number): void{
    const blockClassRoom = new ScheduleBlockClassRoom();
    this.scheduleBlockClassRoomService.createValue(blockClassRoom)
      .subscribe((response: ScheduleBlockClassRoom) => {
        // nothing
      });
  }
  createBlockTeacher(blockId: number, teacherId: number): void{
    const blockTeacher = new ScheduleBlockTeacher(0, teacherId, blockId, 0 );
    this.scheduleBlockTeacherService.createValue(blockTeacher)
      .subscribe((response: ScheduleBlockTeacher) => {
       // nothing
    });
  }

  createBlockTopic(blockId: number, topicId: number): void{
    const blockTopic = new ScheduleBlockCurriculumTopicTrainingProgram(0, topicId, blockId, 0);
    this.scheduleBlockCurriculumTopicTrainingProgramService.createValue(blockTopic)
      .subscribe((response: ScheduleBlockCurriculumTopicTrainingProgram) => {
        // nothing
      });
  }

  loadScheduleBlockClassTime(startTime: Date, endTime: Date): void{
    this.scheduleBlockClassTimeService.getValue(1)
      .subscribe((data: ScheduleBlockClassTime) => {
        if (data){
          this.tempClassTime = data;
        }
      });
  }


  loadScheduleBlockCurriculumTopics(): void {
  this.scheduleBlockCurriculumTopicTrainingProgramService.getValuesFromScheduleBlock(this.scheduleElement.scheduleBlockId)
    .subscribe((data: ScheduleBlockCurriculumTopicTrainingProgram[]) => {
      if (data.length > 0) {
        console.log(data);
      }
    });
  }

  loadGroups(): void{
    this.groupService.getValues()
      .subscribe((data: Group[]) => {
        if (data.length > 0){
          this.groups = data;
        }
      });
  }



  loadCurriculumTopicTrainingPrograms(): void{
    // this.trainingProgramCurriculumSectionService.getFromTrainingProgram(this.scheduleElement.programId)
    //   .subscribe((data: TrainingProgramCurriculumSection[]) => {
    //     if (data.length > 0){
    //       this.curriculumTopicTrainingPrograms = data;
    //     }
    //     // {
    //     //   data.forEach((obj) => {
    //     //
    //     //   });
    //     // }
    //   });
    this.curriculumTopicTrainingProgramService.getValues()
          .subscribe((topicsData: CurriculumTopicTrainingProgram[]) => {
            if (topicsData.length > 0) {
              this.curriculumTopicTrainingPrograms = topicsData;
            }
          });
  }

  loadTrainingProgramTeachers(): void {
    this.teacherService.getValues()
      .subscribe((teachersData: Teacher[]) => {
        if (teachersData.length > 0) {
          teachersData.forEach((teacher: Teacher) => {
            teacher.fullNameForm = teacher.lastName + ' ' + teacher.firstName + ' ' +
              teacher.patronymicName + ' (' + teacher.position + ')';
            this.teachers.push(teacher);
          });
        }
      });
  }


  MergeWithSubGroup(val: string, checked: boolean = true): void {
    console.log('sdfdsfsdfsdfs');
    console.log(this.elementData);
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

