import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CurriculumTopicTrainingProgram} from '../../../models/СurriculumTopicTrainingProgram';
import {CurriculumTopic} from '../../../models/CurriculumTopic';

@Component({
  selector: 'app-curriculum-topic-child',
  templateUrl: './curriculum-topic-child.component.html',
  styles: [
  ]
})
export class CurriculumTopicChildComponent implements OnInit {

  constructor() { }

  @Input() i: number;
  @Input() item: any;
  done = [];

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container && this.trainingProgramCurriculumSectionId) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.saveCurriculumTopicTrainingProgram();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.saveCurriculumTopicTrainingProgram();
    }
  }

  loadCurriculumTopicTrainingProgram(): void {
    this.curriculumTopicTrainingProgramService.getFromTrainingProgramCurriculumSection(this.trainingProgramCurriculumSectionId)
      .subscribe((curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[]) => {
        if (curriculumTopicTrainingPrograms) {
          curriculumTopicTrainingPrograms
            .sort((a, b) => a.serialNumber - b.serialNumber);
          curriculumTopicTrainingPrograms.forEach((curriculumTopicTrainingProgram) => {
            // this.occupationFormMaxVariableTopicHoursService.getValue(this.id, object.id)
            //   .subscribe((occupationFormMaxVariableTopicHours: OccupationFormMaxVariableTopicHour[]) => {
            //
            //   }); // тут остановился
            this.done.push({
              second: curriculumTopicTrainingProgram.topicTitle,
              third: curriculumTopicTrainingProgram.isVariable,
              fourth: curriculumTopicTrainingProgram.classHours,
              seventh: curriculumTopicTrainingProgram.id,
              eight: curriculumTopicTrainingProgram.serialNumber,
              ninth: curriculumTopicTrainingProgram.annotation
            });
          });
        }
      });
  }

  // CurriculumTopic
  addCurriculumTopic(): void {
    this.crateCurriculumTopic();
  }

  crateCurriculumTopic(): void {
    this.curriculumTopicService.createValue(this.curriculumTopicTmp)
      .subscribe((data: CurriculumTopic) => {
        if (data){
          this.curriculumTopicTmp = data;
          console.log('Success CurriculumTopic');
          this.done.push({
            first: this.curriculumTopicTmp.id,
            second: this.curriculumTopicTmp.topicTitle,
            sixth: this.id,
            third: false,
            fourth: 0,
            fifth: 1
          });
          this.crateCurriculumTopicStudentCategory();
        }
      });
  }

  updateCurriculumTopicTrainingProgram(tmp: CurriculumTopicTrainingProgram): void {
    this.curriculumTopicTrainingProgramService.updateValue(tmp)
      .subscribe((data: CurriculumTopicTrainingProgram) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  // SAVE
  saveCurriculumTopicTrainingProgram(): void { // Сохранение списка тем учебных программ
    let i = 0;
    if (this.trainingProgramCurriculumSectionSelect){
      this.done.forEach((object, index) => {
        let curriculumTopicTrainingProgram: CurriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
        i = index + 1;
        curriculumTopicTrainingProgram.trainingProgramId = +object.sixth;
        curriculumTopicTrainingProgram.curriculumTopicId = object.first;
        curriculumTopicTrainingProgram.classHours = object.fourth;
        curriculumTopicTrainingProgram.isVariable = object.third;
        if (object.fifth) {
          curriculumTopicTrainingProgram.occupationFormId = object.fifth;
        }
        else {
          curriculumTopicTrainingProgram.occupationFormId = 1;
        }
        curriculumTopicTrainingProgram.serialNumber = i;
        curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSectionId;
        curriculumTopicTrainingProgram.id = object.seventh;
        if (curriculumTopicTrainingProgram.id){
          this.curriculumTopicTrainingProgramService.createValue(curriculumTopicTrainingProgram)
            .subscribe((data: CurriculumTopicTrainingProgram) => {
              object.seventh = data.id;
              console.log('Save was successful');
              curriculumTopicTrainingProgram = null;
            });
        }
        else {
          this.updateCurriculumTopicTrainingProgram(curriculumTopicTrainingProgram);
          curriculumTopicTrainingProgram = null;
        }
      });
    }
  }

  updateSingleCurriculumTopicTrainingProgram(tmp: any): void {
    const curriculumTopicTrainingProgram = new CurriculumTopicTrainingProgram();
    curriculumTopicTrainingProgram.id = tmp.seventh;
    curriculumTopicTrainingProgram.isVariable = tmp.third;
    curriculumTopicTrainingProgram.classHours = tmp.fourth;
    curriculumTopicTrainingProgram.serialNumber = tmp.eight;
    curriculumTopicTrainingProgram.curriculumTopicId = tmp.first;
    curriculumTopicTrainingProgram.occupationFormId = tmp.fifth;
    curriculumTopicTrainingProgram.trainingProgramId = tmp.sixth;
    curriculumTopicTrainingProgram.trainingProgramCurriculumSectionId = this.trainingProgramCurriculumSectionId;

    this.curriculumTopicTrainingProgramService.updateValue(curriculumTopicTrainingProgram)
      .subscribe((data: CurriculumTopicTrainingProgram) => {
        console.log('Update was successful ' + data.serialNumber);
      });
  }

  // DELETE
  deleteCurriculumTopicTrainingProgram(id: any, indx: number): void {
    this.done.splice(indx, 1);
    if (id !== 'undefined'){
      this.curriculumTopicTrainingProgramService.deleteValue(id).subscribe(() => {
        console.log('Delete was successful ' + id);
      });
    }
  }

  crateCurriculumTopicStudentCategory(): void {
    const tmp: CurriculumTopicStudentCategory = new CurriculumTopicStudentCategory();
    tmp.curriculumTopicId = this.curriculumTopicTmp.id;
    tmp.studentCategoryId = this.trainingProgram.studentCategoryId;
    this.curriculumTopicStudentCategoryService.createValue(tmp)
      .subscribe((data: CurriculumTopicStudentCategory) => {
        if (data){
          console.log('Success StudentCategory');
          this.crateCurriculumTopicDepartment();
        }
      });
  }

  crateCurriculumTopicDepartment(): void {
    const tmp: CurriculumTopicDepartment = new CurriculumTopicDepartment();
    tmp.curriculumTopicId = this.curriculumTopicTmp.id;
    tmp.departmentId = this.trainingProgram.departmentId;
    this.curriculumTopicDepartmentService.createValue(tmp)
      .subscribe((data: CurriculumTopicDepartment) => {
        if (data){
          console.log('Success Department');
          this.cancel();
          this.saveCurriculumTopicTrainingProgram();
        }
      });
  }

}
