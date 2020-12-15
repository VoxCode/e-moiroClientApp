import {Component, OnInit} from '@angular/core';
import { Packer } from 'docx';
import { model, empty } from './cv-data';
import { DocumentCreator } from './cv-generator';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgram} from '../models/TrainingProgram';

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator.component.html',
  styleUrls: ['./docx-generator.component.scss'],
  providers: [TrainingProgramService]
})
export class DocxGeneratorComponent implements OnInit{
  trainingProgram: TrainingProgram;
  docx: any;

  constructor(
    private trainingProgramService: TrainingProgramService
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadTrainingProgram();
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(1)
      .subscribe((data: TrainingProgram) => {
        if (data !== undefined){
          this.trainingProgram = data;
          this.getDocument();
        }
      });
  }

  // tslint:disable-next-line:typedef
  public getDocument() {
    const documentCreator = new DocumentCreator(this.trainingProgram);
    const docxTmp = documentCreator.create([
      model,
      empty
    ]);
    Packer.toBlob(docxTmp).then(blob => {
      this.docx = blob;
    });
  }
}
