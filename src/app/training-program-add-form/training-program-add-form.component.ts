import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CurriculumTopicAdditionalLiterature} from '../models/СurriculumTopicAdditionalLiterature';
import {CurriculumTopicAdditionalLiteratureService} from '../services/curriculum-topic-additional-literature.service';

@Component({
  selector: 'app-training-program-add-form',
  templateUrl: './training-program-add-form.component.html',
  styleUrls: ['./training-program-add-form.component.scss'],
  providers: [CurriculumTopicAdditionalLiteratureService]
})

export class TrainingProgramAddFormComponent implements OnInit{

  curriculumTopicAdditionalLiterature: CurriculumTopicAdditionalLiterature;
  public additionalLiteraturesList: CurriculumTopicAdditionalLiterature[] = [{}];
  todo: CurriculumTopicAdditionalLiterature[];

  // todo = [];

  done = [
  ];

  constructor(
    private curriculumTopicAdditionalLiteratureService: CurriculumTopicAdditionalLiteratureService
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadCurriculumTopicAdditionalLiterature();
  }

  // tslint:disable-next-line:typedef
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicAdditionalLiterature() {
    this.curriculumTopicAdditionalLiteratureService.getValues()
      .subscribe((data: CurriculumTopicAdditionalLiterature[]) => {
        if (data.length !== 0){
          this.additionalLiteraturesList = data;
          this.todo = this.additionalLiteraturesList;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.additionalLiteraturesList.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
  }
}

