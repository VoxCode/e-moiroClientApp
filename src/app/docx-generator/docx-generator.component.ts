import {Component, OnInit} from '@angular/core';
import { Packer } from 'docx';
import { model, empty } from './cv-data';
import { DocumentCreator } from './cv-generator';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgram} from '../models/TrainingProgram';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator.component.html',
  styleUrls: ['./docx-generator.component.scss'],
  providers: [TrainingProgramService]
})
export class DocxGeneratorComponent implements OnInit{
  id: number;
  trainingProgram: TrainingProgram;
  docx: any;

  constructor(
    private trainingProgramService: TrainingProgramService,
    private route: ActivatedRoute
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  // LOAD

  // tslint:disable-next-line:typedef
  loadTrainingProgram() {
    this.trainingProgramService.getValue(this.id)
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
