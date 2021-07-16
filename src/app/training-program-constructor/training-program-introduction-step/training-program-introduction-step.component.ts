import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../../models/TrainingProgram';
import {Globals} from '../../globals';
import {TrainingProgramIntroductionService} from '../../services/training-program-introduction.service';
import {TrainingProgramIntroduction} from '../../models/TrainingProgramIntroduction';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';
import {IntroductionTemplate} from '../../document-part-templates/introduction-template';
import {Packer} from 'docx';
import {Base64ToBlob} from '../../base64-to-blob/base64-to-blob';

@Component({
  selector: 'app-training-introduction-step',
  templateUrl: './training-program-introduction-step.component.html',
  styleUrls: ['./training-program-introduction-step.component.scss'],
  providers: [
    TrainingProgramIntroductionService
  ]
})
export class TrainingProgramIntroductionStepComponent implements OnInit {

  id: number;
  trainingProgram: TrainingProgram;
  trainingProgramIntroduction: TrainingProgramIntroduction = new TrainingProgramIntroduction();
  docxContent: Blob;

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
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
          this.crateTemplate();
          return;
        }
        this.trainingProgramIntroduction = trainingProgramIntroduction;
        const type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        this.docxContent = new Base64ToBlob().generate(trainingProgramIntroduction.introduction, type, 512);
      });
  }

  crateTrainingProgram(content: string): void {
    this.trainingProgramIntroduction.trainingProgramId = this.id;
    this.trainingProgramIntroduction.introduction = content;
    this.trainingProgramIntroductionService.createValue(this.trainingProgramIntroduction)
      .subscribe((trainingProgramIntroduction: TrainingProgramIntroduction) => {
        this.trainingProgramIntroduction = trainingProgramIntroduction;
        console.log('Crate was successful');
      });
  }

  editTrainingProgram(content: string): void {
    this.trainingProgramIntroduction.introduction = content;
    this.trainingProgramIntroductionService.updateValue(this.trainingProgramIntroduction)
      .subscribe((trainingProgramIntroduction: TrainingProgramIntroduction) => {
        this.trainingProgramIntroduction = trainingProgramIntroduction;
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

  crateTemplate(): void {
    const introductionTemplate = new IntroductionTemplate().create();
    Packer.toBlob(introductionTemplate).then(blobResult => {
      this.docxContent = blobResult;
    });
  }
}
