import {Component, OnInit} from '@angular/core';
import {Packer} from 'docx';
import {DocumentCreatorSchedule} from './cv-generator-schedule';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {TrainingProgramMainLiteratureService} from '../services/training-program-main-literature.service';
import {TrainingProgramAdditionalLiteratureService} from '../services/training-program-additional-literature.service';
import {TrainingProgramRegulationService} from '../services/training-program-regulation.service';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';
import {OccupationFormClassHourService} from '../services/occupation-form-class-hour.service';
import {MaxVariableTopicTimeService} from '../services/max-variable-topic-time.service';
import {OccupationFormService} from '../services/occupation-form.service';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramGenerator} from '../models/generator-models/TrainingProgramGenerator';
import {GroupService} from '../services/group.service';
import {saveAs} from 'file-saver';
import {ScheduleDateService} from '../services/schedule-services/schedule-date.service';
import {GroupScheduleGenerator} from '../models/generator-models/GroupScheduleGenerator';
import {Group} from '../models/Group';
import {TrainingProgram} from '../models/TrainingProgram';
import {ScheduleDate} from '../models/schedule-models/ScheduleDate';
import {ScheduleDateScheduleBlockService} from '../services/schedule-services/schedule-date-schedule-block.service';
import {ScheduleDateScheduleBlock} from '../models/schedule-models/ScheduleDateScheduleBlock';
import {ScheduleBlock} from '../models/schedule-models/ScheduleBlock';
import {ScheduleBlockTeacherService} from '../services/schedule-services/schedule-block-teacher.service';
import {ScheduleBlockCurriculumTopicTrainingProgramService} from '../services/schedule-services/schedule-block-curriculum-topic-training-program.service';
import {ScheduleBlockClassRoomService} from '../services/schedule-services/schedule-block-class-room.service';
import {ScheduleBlockClassTimeService} from '../services/schedule-services/schedule-block-class-time.service';
import {ScheduleBlockClassTime} from '../models/schedule-models/ScheduleBlockClassTime';
import {ScheduleBlockClassRoom} from '../models/schedule-models/ScheduleBlockClassRoom';
import {ScheduleBlockCurriculumTopicTrainingProgram} from '../models/schedule-models/ScheduleBlockCurriculumTopicTrainingProgram';
import {ScheduleBlockTeacher} from '../models/schedule-models/ScheduleBlockTeacher';
import {DatePipe} from '@angular/common';
import {Teacher} from '../models/Teacher';

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator-schedule.component.html',
  styleUrls: ['./docx-generator-schedule.component.scss'],
  providers: [
    GroupService,
    TrainingProgramService,
    ScheduleDateService,
    ScheduleDateScheduleBlockService,
    ScheduleBlockTeacherService,
    ScheduleBlockCurriculumTopicTrainingProgramService,
    ScheduleBlockClassRoomService,
    ScheduleBlockClassTimeService,
    DatePipe
  ]
})

export class DocxGeneratorScheduleComponent implements OnInit {

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private trainingProgramService: TrainingProgramService,
    private scheduleDatesService: ScheduleDateService,
    private scheduleDateScheduleBlockService: ScheduleDateScheduleBlockService,
    private scheduleBlockClassTimeService: ScheduleBlockClassTimeService,
    private scheduleBlockClassRoomService: ScheduleBlockClassRoomService,
    private scheduleBlockCurriculumTopicTrainingProgramService: ScheduleBlockCurriculumTopicTrainingProgramService,
    private scheduleBlockTeacherService: ScheduleBlockTeacherService,
  ) {
  }

  docx: any[] = [];
  id: number;

  isBLR = false;
  myDocx: any;

  group: Group;
  trainingProgram: TrainingProgram;
  scheduleDates: ScheduleDate[] = [];
  scheduleBlocks: GroupScheduleGenerator[] = [];

  ngOnInit(): void {
    const date = new Date();
    this.id = this.route.snapshot.params.id;
    this.loadGroup(this.id);
    this.getDocument();
  }

  loadGroup(id: number): void {
    this.groupService.getValue(id)
      .subscribe((data: Group) => {
        if (data) {
          this.group = data;
          this.loadTrainingProgram(data.trainingProgramId);
          this.loadScheduleDates(data.id);
        }
      });
  }

  loadTrainingProgram(id: number): void {
    this.trainingProgramService.getValueForDocxGenerator(id)
      .subscribe((data: TrainingProgram) => {
        if (data) {
          this.trainingProgram = data;
        }
      });
  }

  loadScheduleDates(groupId: number): void {
    this.scheduleDatesService.getGroupDates(groupId)
      .subscribe((data: ScheduleDate[]) => {
        if (data.length > 0) {
          this.scheduleDates = data;
          data.forEach((x) => {
            this.loadScheduleBlocks(x.id, x.date);
          });
        }
      });
  }

  loadScheduleBlocks(dateId: number, date: Date): void {
    this.scheduleDateScheduleBlockService.getValuesFromScheduleDate(dateId)
      .subscribe((data: ScheduleDateScheduleBlock[]) => {
        if (data.length > 0) {
          data.forEach((x) => {
            this.scheduleBlockClassRoomService.getValuesFromScheduleBlock(x.scheduleBlockId)
              .subscribe((room: ScheduleBlockClassRoom) => {
                if (room) {
                  this.scheduleBlockClassTimeService.getValuesFromScheduleBlock(x.scheduleBlockId)
                    .subscribe((time: ScheduleBlockClassTime) => {
                      if (time) {
                        this.scheduleBlockCurriculumTopicTrainingProgramService.getValuesFromScheduleBlock(x.scheduleBlockId)
                          .subscribe((topic: ScheduleBlockCurriculumTopicTrainingProgram) => {
                            if (topic) {
                              this.scheduleBlockTeacherService.getValuesFromScheduleBlock(x.scheduleBlockId)
                                .subscribe((teacher: ScheduleBlockTeacher) => {
                                  if (teacher) {
                                    this.scheduleBlocks.push({
                                      date: new Date(date),
                                      room: room[0].name.toString(),
                                      time: `${this.transformToHours(time[0].classTimeStart)} - ${this.transformToHours(time[0].classTimeEnd)}\n` +
                                        `${this.transformToHours(time[0].secondTimeStart)} - ${this.transformToHours(time[0].secondTimeEnd)}`,
                                      topic: topic[0].topicTitle,
                                      teacher: Teacher.getFullName(teacher[0])
                                    });
                                    console.log(this.scheduleBlocks);
                                  }
                                });
                            }
                          });
                      }
                    });
                }
              });
          });
        }
      });
  }

  transformToHours(date: Date): string {
    return this.datePipe.transform(date, 'HH:mm');
  }

// time, room,  for group tipics - teachers -
  public getDocument(): void {
    setTimeout(() => {
      const documentCreator = new DocumentCreatorSchedule(
        this.group,
        this.trainingProgram,
        this.scheduleBlocks,
        this.isBLR,
      );
      const docxTmp = documentCreator.create();
      Packer.toBlob(docxTmp).then(blob => {
        this.docx.push(blob);
        this.myDocx = blob;
      });
    }, 2000);
  }

  generateDocRU(): void {
    this.isBLR = false;
  }

  generateDocBLR(): void {
    this.isBLR = true;
  }

  downloadDocx(): void {
    saveAs(this.myDocx, 'расписание.docx');
  }
}
