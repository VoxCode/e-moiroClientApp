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
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ScheduleClassTimes} from '../schedule/schedule-class-times';
import DateTimeFormat = Intl.DateTimeFormat;
import {ScheduleDate} from '../models/schedule-models/ScheduleDate';
import {ScheduleDateScheduleBlock} from '../models/schedule-models/ScheduleDateScheduleBlock';
import {ScheduleDateScheduleBlockService} from '../services/schedule-services/schedule-date-schedule-block.service';
import {ScheduleDateService} from '../services/schedule-services/schedule-date.service';
import {Observable} from 'rxjs/dist/types';
import {map, startWith} from 'rxjs/operators';
import {MY_FORMATS} from '../utils/material-date-format';

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
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}, ],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleBlockComponent implements OnInit {

  prevDate: Date;

  scheduleElement: ScheduleElement;
  rooms: ClassRoom[] = [];
  teachers: Teacher[] = [];
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];
  groups: Group[] = [];
  times: ClassTime[] = [];
  parsedTimes: {
    mondayFirstShift: ClassTime[],
    mondaySecondShift: ClassTime[],
    genericFirstShift: ClassTime[],
    genericSecondShift: ClassTime[]
  };

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    groupId: new FormControl('', Validators.required),
    topicId: new FormControl('', [Validators.required, this.requireMatchTopic.bind(this)]),
    teacherId: new FormControl('', [Validators.required, this.requireMatchTeacher.bind(this)]),
    roomId: new FormControl('', [Validators.required, this.requireMatchRoom.bind(this)]),
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

  sundayDatesFilter = (d: Date): boolean => {
    const day = new Date(d).getDay();
    return day !== 0;
  }

  displayTopic(value: number): string {
    return value ? this.curriculumTopicTrainingPrograms.find(el => el.id === value).topicTitle : undefined;
  }

  displayTeacher(value: number): string {
    return value ? this.teachers.find(el => el.id === value).fullNameForm : undefined;
  }

  displayRoom(value: number): string {
    return value ? this.rooms.find(el => el.id === value).name : undefined;
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
    this.times = this.data.times;

    this.prevDate = new Date(this.form.get('date').value);

    this.parsedTimes = {
      mondayFirstShift: [],
      mondaySecondShift: [],
      genericFirstShift: [],
      genericSecondShift: []
    };
    this.parseTimes();
    this.scheduleElement = this.data.scheduleElement;

    this.form.get('date').valueChanges.subscribe(x => {
      console.log(new Date(x).getDay());
      console.log(this.prevDate);
      const prevDay = this.prevDate.getDay();
      const newDay = new Date(x).getDay();
      if (newDay !== prevDay) {
        if (newDay !== 1 && prevDay === 1) {
          this.form.controls.timeId.patchValue(undefined);
          this.form.controls.timeId.markAsTouched();
        }
        if (newDay === 1 && prevDay !== 1) {
          this.form.controls.timeId.patchValue(undefined);
          this.form.controls.timeId.markAsTouched();
        }
      }
      this.prevDate = new Date(x);
    });



    // if (this.data.scheduleElement !== undefined) {
    //   this.scheduleElement = this.data.scheduleElement;
    //   this.selectedGroup = this.groups.filter(u => u.id >= this.scheduleElement.groupId)[0];
    //   this.selectedTopic = this.curriculumTopicTrainingPrograms.filter(u => u.id >= this.scheduleElement.topicId)[0];
    //   this.selectedTeacher = this.teachers.filter(u => u.id >= this.scheduleElement.teacherId)[0];
    // }

    console.log('editor init');
    if (this.scheduleElement.scheduleBlockId != null) {
      this.form.controls.id.patchValue(this.scheduleElement.scheduleBlockId);
      this.form.controls.groupId.patchValue(this.scheduleElement.groupId);
      this.form.controls.topicId.patchValue(this.scheduleElement.topicId);
      this.form.controls.teacherId.patchValue(this.scheduleElement.teacher.id);
      this.form.controls.roomId.patchValue(this.scheduleElement.roomId);
      this.form.controls.date.patchValue(this.scheduleElement.date);
      this.form.controls.timeId.patchValue(this.scheduleElement.time.id);
      this.form.controls.subgroup.patchValue(this.scheduleElement.subgroup);
    }
    else {
      this.form.get('date').setValue(this.data.date);
    }

    console.log(this.scheduleElement);

    // const codCtrl = this.form.get('date');
    // codCtrl.valueChanges.subscribe(date => {
    //   this.dayOfTheWeek = new Date(date).getDay();
    // });

  }

  private parseTimes(): void {
    this.parsedTimes.mondayFirstShift = this.times.filter(x => x.shift === 1 && x.dayOfTheWeek === 1);
    this.parsedTimes.mondaySecondShift = this.times.filter(x => x.shift === 2 && x.dayOfTheWeek === 1);
    this.parsedTimes.genericFirstShift = this.times.filter(x => x.shift === 1 && x.dayOfTheWeek !== 1);
    this.parsedTimes.genericSecondShift = this.times.filter(x => x.shift === 2 && x.dayOfTheWeek !== 1);
    console.log(this.times);
  }

  save(): void {
    // this.scheduleElement.topic = "qwewedsfdsfdsfwe";
    if (this.scheduleElement.scheduleBlockId !== undefined) {
      console.log('Updading');
      this.updateScheduleBlock(this.form.value, this.scheduleElement);
    } else {
      this.createScheduleBlock(this.form.value);
      console.log('Created');
    }
  }

  private requireMatchTopic(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.curriculumTopicTrainingPrograms.filter(x => x.id === selection).length > 0) {
      return null;
    }
    return {requireMatch: true};
  }

  private requireMatchTeacher(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.teachers.filter(x => x.id === selection).length > 0) {
      return null;
    }
    return {requireMatch: true};
  }

  private requireMatchRoom(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.rooms.filter(x => x.id === selection).length > 0) {
      return null;
    }
    return {requireMatch: true};
  }

  dayOfTheWeek(): number {
    return new Date(this.form.get('date').value).getDay();
  }

  updateScheduleBlock(args: any, argsPrev: ScheduleElement): void {
    console.log(args);
    if (args.date !== argsPrev.date || args.groupId !== argsPrev.groupId) {
      if (argsPrev.dateId !== undefined) {
        this.scheduleDateService.updateValue(new ScheduleDate(argsPrev.dateId, args.date, args.groupId)).subscribe(
          (updateResponse: ScheduleDate) => {
            this.scheduleElement.date = new Date(updateResponse.date);
            this.scheduleElement.dateId = updateResponse.id;
            this.scheduleElement.groupId = args.groupId;
            this.scheduleElement.group = this.groups.filter(x => x.id === args.groupId)[0].groupNumber;
            console.log(updateResponse);
          });
      } else {
        this.throwError('', '');
        return;
      }
    }
    if (args.subgroup !== argsPrev.subgroup) {
      this.scheduleBlockService.updateValue(new ScheduleBlock(argsPrev.scheduleBlockId, args.subgroup))
        .subscribe((updateResponse: ScheduleBlock) => {
          this.scheduleElement.subgroup = updateResponse.subgroupNumber;
        });
    }
    if (args.teacherId !== argsPrev.teacher.id) {
      this.scheduleBlockTeacherService.getValuesFromScheduleBlock(argsPrev.scheduleBlockId)
        .subscribe((getResponse: ScheduleBlockTeacher[]) => {
          if (getResponse.length !== 0) {
            getResponse[0].teacherId = args.teacherId;
            this.scheduleBlockTeacherService.updateValue(getResponse[0])
              .subscribe((updateResponse: ScheduleBlockTeacher) => {
                this.scheduleElement.teacher = this.teachers.filter(x => x.id === updateResponse.teacherId)[0];
              });
          }
        });
    }
    if (args.timeId !== argsPrev.time.id) {
      this.scheduleBlockClassTimeService.getValuesFromScheduleBlock(argsPrev.scheduleBlockId)
        .subscribe((getResponse: ScheduleBlockClassTime[]) => {
          if (getResponse.length !== 0) {
            getResponse[0].classTimeId = args.timeId;
            this.scheduleBlockClassTimeService.updateValue(getResponse[0])
              .subscribe((updateResponse: ScheduleBlockClassTime) => {
                this.scheduleElement.time = this.times.filter(x => x.id === updateResponse.classTimeId)[0];
              });
          }
        });
      console.log('sdfsdf');
      console.log(this.scheduleElement);
    }
    if (args.topicId !== argsPrev.topicId) {
      this.scheduleBlockCurriculumTopicTrainingProgramService.getValuesFromScheduleBlock(argsPrev.scheduleBlockId)
        .subscribe((getResponse: ScheduleBlockCurriculumTopicTrainingProgram[]) => {
          if (getResponse.length !== 0) {
            getResponse[0].curriculumTopicTrainingProgramId = args.topicId;
            this.scheduleBlockCurriculumTopicTrainingProgramService.updateValue(getResponse[0])
              .subscribe((updateResponse: ScheduleBlockCurriculumTopicTrainingProgram) => {
                const aux = this.curriculumTopicTrainingPrograms.filter(x => x.id === updateResponse.curriculumTopicTrainingProgramId)[0];
                this.scheduleElement.topicId = aux.id;
                this.scheduleElement.topic = aux.topicTitle;
              });
          }
        });
    }
    if (args.roomId !== argsPrev.roomId) {
      this.scheduleBlockClassRoomService.getValuesFromScheduleBlock(argsPrev.scheduleBlockId)
        .subscribe((getResponse: ScheduleBlockClassRoom[]) => {
          if (getResponse.length !== 0) {
            getResponse[0].classRoomId = args.roomId;
            this.scheduleBlockClassRoomService.updateValue(getResponse[0])
              .subscribe((updateResponse: ScheduleBlockClassRoom) => {
                const aux = this.rooms.filter(x => x.id === updateResponse.classRoomId)[0];
                this.scheduleElement.roomId = aux.id;
                this.scheduleElement.room = aux.name;
              });
          }
        });
    }
    console.log('wtf is this');
    console.log(this.form.getRawValue());
    this.dialogRef.close({status: 2, meta: this.scheduleElement});
  }


  createScheduleBlock(args: any): void {
    const date = new ScheduleDate(0, args.date, args.groupId);
    const block = new ScheduleBlock(0, args.subgroup, 0);
    this.scheduleBlockService.createValue(block)
      .subscribe((blockResponse: ScheduleBlock) => {
        this.scheduleElement.scheduleBlockId = blockResponse.id;
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
        this.scheduleBlockService.getScheduleElement(dateBlock.scheduleBlockId).subscribe((el: ScheduleElement) => {
          this.dialogRef.close({status: 1, meta: this.scheduleElement});
        });
      });
  }

  createScheduleBlockTeacher(blockTeacher: ScheduleBlockTeacher): void {
    this.scheduleBlockTeacherService.createValue(blockTeacher)
      .subscribe((blockTeacherResponse: ScheduleBlockTeacher) => {
        // nothing
      });
  }

  createScheduleBlockRoom(blockRoom: ScheduleBlockClassRoom): void {
    this.scheduleBlockClassRoomService.createValue(blockRoom)
      .subscribe((blockRoomResponse: ScheduleBlockClassRoom) => {
        // nothing
      });

  }

  createScheduleBlockTime(blockTime: ScheduleBlockClassTime): void {
    this.scheduleBlockClassTimeService.createValue(blockTime)
      .subscribe((blockClassTimeResponse: ScheduleBlockClassTime) => {
        // nothing
      });
  }

  throwError(text: string, title: string): void {
    console.log(text + title);
  }

  qwe() {
    console.log(this.form);
  }
}

