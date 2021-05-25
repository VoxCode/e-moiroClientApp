import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../../models/TrainingProgram';
import {Globals} from '../../globals';
import {TrainingProgramService} from '../../services/training-program.service';
import {TrainingProgramIntroductionService} from '../../services/training-program-introduction.service';
import {TrainingProgramIntroduction} from '../../models/TrainingProgramIntroduction';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';

@Component({
  selector: 'app-training-introduction-step',
  templateUrl: './training-program-introduction-step.component.html',
  styleUrls: ['./training-program-introduction-step.component.scss'],
  providers: [
    TrainingProgramService,
    TrainingProgramIntroductionService
  ]
})
export class TrainingProgramIntroductionStepComponent implements OnInit {

  id: number;
  trainingProgram: TrainingProgram;
  trainingProgramIntroduction: TrainingProgramIntroduction = new TrainingProgramIntroduction();
  introductionContent: string;

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
    private trainingProgramService: TrainingProgramService,
    private trainingProgramIntroductionService: TrainingProgramIntroductionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  loadTrainingProgram(): void {
    this.trainingProgramConstructorService.TrainingProgram(this.id)
      .subscribe((trainingProgramResponse: TrainingProgram) => {
        this.trainingProgram = trainingProgramResponse;
        this.loadTrainingProgramIntroduction();
      });
  }

  loadTrainingProgramIntroduction(): void {
    this.trainingProgramIntroductionService.getValueFromTrainingProgram(this.id)
      .subscribe((trainingProgramIntroduction: TrainingProgramIntroduction) => {
        if (!trainingProgramIntroduction) {
          this.introductionContent = 'Empty';
          return;
        }
        this.trainingProgramIntroduction = trainingProgramIntroduction;
        this.introductionContent = trainingProgramIntroduction.introduction;
      });
  }

  crateTrainingProgram(content: string): void {
    this.trainingProgramIntroduction.trainingProgramId = this.id;
    this.trainingProgramIntroduction.introduction = content;
    this.trainingProgramIntroductionService.createValue(this.trainingProgramIntroduction).subscribe(() => {
      console.log('Crate was successful');
    });
  }

  editTrainingProgram(content: string): void {
    this.trainingProgramIntroduction.introduction = content;
    this.trainingProgramIntroductionService.updateValue(this.trainingProgramIntroduction).subscribe(() => {
        console.log('Update was successful');
    });
  }

  saveChanges(content: string): void {
    if (!this.trainingProgramIntroduction.id) {
      this.crateTrainingProgram(content);
    }
    else {
      this.editTrainingProgram(content);
    }
  }
}
