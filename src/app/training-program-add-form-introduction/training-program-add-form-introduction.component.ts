import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../models/TrainingProgram';
import {Globals} from '../globals';
import {TrainingProgramService} from '../services/training-program.service';

@Component({
  selector: 'app-training-program-add-form-introduction',
  templateUrl: './training-program-add-form-introduction.component.html',
  styleUrls: ['./training-program-add-form-introduction.component.scss'],
  providers: [
    TrainingProgramService,
    ]
})
export class TrainingProgramAddFormIntroductionComponent implements OnInit {

  id: number;
  trainingProgram: TrainingProgram;
  introductionContent: string;

  constructor(
    public globals: Globals,
    private trainingProgramService: TrainingProgramService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
      .subscribe((data: TrainingProgram) => {
        if (data){
          this.trainingProgram = data;
          if (this.trainingProgram.introduction) {
            this.introductionContent = this.trainingProgram.introduction;
          }
          else {
            this.introductionContent = 'Empty';
          }
        }
      });
  }

  editTrainingProgram(): void {
    this.trainingProgramService.updateValue(this.trainingProgram).subscribe(() => {
        console.log('Update was successful');
    });
  }

  saveChanges(content: string): void {
    this.trainingProgram.introduction = content;
    console.log(content);
    this.editTrainingProgram();
  }
}
