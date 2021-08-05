import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../../models/TrainingProgram';
import {Globals} from '../../globals';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';
import {CurriculumTopicTrainingProgramService} from '../../services/curriculum-topic-training-program.service';
import {CurriculumTopicTrainingProgram} from '../../models/СurriculumTopicTrainingProgram';
import {TrainingProgramCurriculumSectionService} from '../../services/training-program-curriculum-section.service';
import {TrainingProgramCurriculumSection} from '../../models/TrainingProgramCurriculumSection';

@Component({
  selector: 'app-training-program-guided-test-work',
  templateUrl: './training-program-guided-test-work-step.component.html',
  styleUrls: ['./training-program-guided-test-work-step.component.scss'],
  providers: [
    CurriculumTopicTrainingProgramService,
    TrainingProgramCurriculumSectionService
  ]
})

export class TrainingProgramGuidedTestWorkStepComponent implements OnInit{
  id: number;
  trainingProgram: TrainingProgram;
  curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = [];

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
    this.loadTrainingProgramCurriculumSections();
  }

  loadTrainingProgram(): void {
    this.trainingProgramConstructorService.TrainingProgram(this.id)
      .subscribe((trainingProgramResponse: TrainingProgram) => {
        this.trainingProgram = trainingProgramResponse;
      });
  }

  loadTrainingProgramCurriculumSections(): void {
    this.trainingProgramCurriculumSectionService.GetFromTrainingProgram(this.id)
      .subscribe((trainingProgramCurriculumSectionsResponse: TrainingProgramCurriculumSection[]) => {
        const trainingProgramIdArray: number[] = [];
        trainingProgramCurriculumSectionsResponse.forEach(obj => {
          trainingProgramIdArray.push(obj.id);
        });
        this.loadCurriculumTopicTrainingPrograms(trainingProgramIdArray);
      });
  }

  loadCurriculumTopicTrainingPrograms(curriculumSectionIdArray: number[]): void {
    this.curriculumTopicTrainingProgramService.getFromCurriculumSection(curriculumSectionIdArray)
      .subscribe((curriculumTopicTrainingProgramsResponse: CurriculumTopicTrainingProgram[]) => {
        this.curriculumTopicTrainingPrograms = curriculumTopicTrainingProgramsResponse;
      });

  }
}
