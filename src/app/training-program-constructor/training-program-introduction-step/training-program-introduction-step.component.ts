import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../../models/TrainingProgram';
import {Globals} from '../../globals';
import {TrainingProgramService} from '../../services/training-program.service';
import {TrainingProgramIntroductionService} from '../../services/training-program-introduction.service';
import {TrainingProgramIntroduction} from "../../models/TrainingProgramIntroduction";

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
  introductionContent: string;

  constructor(
    public globals: Globals,
    private trainingProgramService: TrainingProgramService,
    private trainingProgramIntroductionService: TrainingProgramIntroductionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  loadTrainingProgram(): void {
    this.trainingProgramService.getValue(this.id)
      .subscribe((trainingProgram: TrainingProgram) => {
        if (!trainingProgram) { return; }
        this.trainingProgram = trainingProgram;
        this.loadTrainingProgramIntroduction();
      });
  }

  loadTrainingProgramIntroduction(): void {
    this.trainingProgramIntroductionService.getValueFromTrainingProgram(this.id)
      .subscribe((trainingProgramIntroduction: TrainingProgramIntroduction) => {
        if (!trainingProgramIntroduction) { return; } // Остановился тут
        if (trainingProgramIntroduction.introduction) {
          this.introductionContent = trainingProgramIntroduction.introduction;
        }
        else {
          this.introductionContent = 'Empty';
        }
      });
  }

  editTrainingProgram(): void {
    this.trainingProgramService.updateValue(this.trainingProgram).subscribe(() => {
        console.log('Update was successful');
    });
  }

  saveChanges(content: string): void {
    // this.trainingProgram.introduction = content;
    this.editTrainingProgram();
  }
}
