import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
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
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ScheduleClassTimes} from '../schedule/schedule-class-times';
import DateTimeFormat = Intl.DateTimeFormat;
import {ScheduleDate} from '../models/schedule-models/ScheduleDate';
import {ScheduleDateScheduleBlock} from '../models/schedule-models/ScheduleDateScheduleBlock';
import {ScheduleDateScheduleBlockService} from '../services/schedule-services/schedule-date-schedule-block.service';
import {ScheduleDateService} from '../services/schedule-services/schedule-date.service';

@Component({
  selector: 'app-schedule-block',
  templateUrl: './schedule-block.component.html',
  styleUrls: ['./schedule-block.component.scss'],
  providers: [
    ScheduleBlockService,
    ScheduleDateService,
    ScheduleDateScheduleBlockService,
    ScheduleBlockCurriculumTopicTrainingProgramService,
    CurriculumTopicTrainingProgramService,
    TrainingProgramCurriculumSectionService,
    ScheduleBlockTeacherService,
    TrainingProgramTeacherService,
    TeacherService,
    GroupService,
    ScheduleBlockClassRoomService,
    ScheduleBlockClassTimeService, TimelineViewsService, TimelineMonthService,
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}, ],
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

  public combineTopic = false;
  public combineRoom = false;
  public combineTeacher = false;
  public divideSubGroups = false;

  scheduleElement: ScheduleElement;
  rooms: ClassRoom[] = [];
  teachers: Teacher[] = [];
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];
  groups: Group[] = [];
  scheduleClassTimes: any = ScheduleClassTimes;

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    groupId: new FormControl('', Validators.required),
    topicId: new FormControl('', Validators.required),
    teacherId: new FormControl('', Validators.required),
    roomId: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeId: new FormControl('', Validators.required),
    subgroup: new FormControl('', Validators.required),
  });


  get groupId(): AbstractControl {
    return this.form.get('groupId');
  }

  get topicId(): AbstractControl {
    return this.form.get('topicId');
  }

  get teacherId(): AbstractControl {
    return this.form.get('teacherId');
  }

  get roomId(): AbstractControl {
    return this.form.get('roomId');
  }

  constructor(
    public dialogRef: MatDialogRef<ScheduleBlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private scheduleBlockCurriculumTopicTrainingProgramService: ScheduleBlockCurriculumTopicTrainingProgramService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private scheduleBlockTeacherService: ScheduleBlockTeacherService,
    private scheduleDateScheduleBlockService: ScheduleDateScheduleBlockService,
    private scheduleDateService: ScheduleDateService,
    private trainingProgramTeacherService: TrainingProgramTeacherService,
    private teacherService: TeacherService,
    private groupService: GroupService,
    private scheduleBlockService: ScheduleBlockService,
    private scheduleBlockClassRoomService: ScheduleBlockClassRoomService,
    private scheduleBlockClassTimeService: ScheduleBlockClassTimeService,
  ) {
  }


  ngOnInit(): void {
    this.groups = this.data.groups;
    this.rooms = this.data.rooms;
    this.curriculumTopicTrainingPrograms = this.data.topics;
    this.teachers = this.data.teachers;

    this.scheduleElement = this.data.scheduleElement;
    // if (this.data.scheduleElement !== undefined) {
    //   this.scheduleElement = this.data.scheduleElement;
    //   this.selectedGroup = this.groups.filter(u => u.id >= this.scheduleElement.groupId)[0];
    //   this.selectedTopic = this.curriculumTopicTrainingPrograms.filter(u => u.id >= this.scheduleElement.topicId)[0];
    //   this.selectedTeacher = this.teachers.filter(u => u.id >= this.scheduleElement.teacherId)[0];
    // }

    console.log('editor init');
    this.form.controls.id.patchValue(this.scheduleElement.id);
    this.form.controls.groupId.patchValue(this.scheduleElement.groupId);
    this.form.controls.topicId.patchValue(this.scheduleElement.topicId);
    this.form.controls.teacherId.patchValue(this.scheduleElement.teacherId);
    this.form.controls.roomId.patchValue(this.scheduleElement.roomId);
    this.form.controls.date.patchValue(this.scheduleElement.date);
    this.form.controls.timeId.patchValue(this.scheduleElement.timeId);
    this.form.controls.subgroup.patchValue(this.scheduleElement.subgroup);

    console.log(this.scheduleElement);

    // const codCtrl = this.form.get('date');
    // codCtrl.valueChanges.subscribe(date => {
    //   this.dayOfTheWeek = new Date(date).getDay();
    // });

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

  save(): void {
    //this.scheduleElement.topic = "qwewedsfdsfdsfwe";
    this.createScheduleBlock(this.form.value);
  }

  dayOfTheWeek(): number {
    return new Date(this.form.get('date').value).getDay();
  }

  createScheduleBlock(args: ScheduleElement): void {
    const date = new ScheduleDate(0, args.date, args.groupId);
    const block = new ScheduleBlock(0, args.subgroup, 0);
    this.scheduleBlockService.createValue(block)
      .subscribe((blockResponse: ScheduleBlock) => {
        this.createScheduleBlockTeacher(new ScheduleBlockTeacher(0, args.teacherId, blockResponse.id));
        this.createScheduleBlockRoom(new ScheduleBlockClassRoom(0, blockResponse.id, args.roomId));
        this.createBlockTopic(new ScheduleBlockCurriculumTopicTrainingProgram(0, args.topicId, blockResponse.id, 0));
        this.createScheduleBlockTime(new ScheduleBlockClassTime(0, blockResponse.id, args.timeId));
        this.scheduleDateService.createValue(date)
          .subscribe((dateResponse: ScheduleDate) => {
            this.createScheduleDateBlock(new ScheduleDateScheduleBlock(0, dateResponse.id, blockResponse.id));
          });
      });
  }

  createBlockTopic(blockTopicProgram: ScheduleBlockCurriculumTopicTrainingProgram): void {
    this.scheduleBlockCurriculumTopicTrainingProgramService.createValue(blockTopicProgram)
      .subscribe((blockTopicProgramResponse: ScheduleBlockCurriculumTopicTrainingProgram) => {
        // nothing
      });
  }

  createScheduleDateBlock(dateBlock: ScheduleDateScheduleBlock): void {
    this.scheduleDateScheduleBlockService.createValue(dateBlock)
      .subscribe((dateBlockResponse: ScheduleDateScheduleBlock) => {
        this.dialogRef.close(this.form.value);
      });
  }

  createScheduleBlockTeacher(blockTeacher: ScheduleBlockTeacher): void {
    this.scheduleBlockTeacherService.createValue(blockTeacher)
      .subscribe((blockResponse) => {
        // nothing
      });
  }

  createScheduleBlockRoom(blockRoom: ScheduleBlockClassRoom): void {
    this.scheduleBlockClassRoomService.createValue(blockRoom)
      .subscribe((blockRoomResponse: ScheduleDate) => {
        // nothing
      });

  }

  createScheduleBlockTime(blockTime: ScheduleBlockClassTime): void {
    this.scheduleBlockClassTimeService.createValue(blockTime)
      .subscribe((blockClassTimeResponse) => {
        // nothing
      });
  }
}

