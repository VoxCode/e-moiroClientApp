import {Component, OnInit} from '@angular/core';
import { Packer } from 'docx';
import { model, empty } from './cv-data';
import { DocumentCreator } from './cv-generator';
import {TrainingProgramService} from '../services/training-program.service';
import {TrainingProgram} from '../models/TrainingProgram';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgramCurriculumSection} from '../models/TrainingProgramCurriculumSection';
import {TrainingProgramCurriculumSectionService} from '../services/training-program-curriculum-section.service';
import {CurriculumTopicTrainingProgram} from '../models/СurriculumTopicTrainingProgram';
import {CurriculumTopicTrainingProgramService} from '../services/curriculum-topic-training-program.service';

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator.component.html',
  styleUrls: ['./docx-generator.component.scss'],
  providers: [
    TrainingProgramService,
    TrainingProgramCurriculumSectionService,
    CurriculumTopicTrainingProgramService
  ]
})

export class DocxGeneratorComponent implements OnInit{
  id: number;
  curriculumTopicsList: CurriculumTopicTrainingProgram[][];
  trainingProgram: TrainingProgram;
  trainingProgramCurriculumSections: TrainingProgramCurriculumSection[];
  docx: any;

  constructor(
    private trainingProgramService: TrainingProgramService,
    private trainingProgramCurriculumSectionService: TrainingProgramCurriculumSectionService,
    private curriculumTopicTrainingProgramService: CurriculumTopicTrainingProgramService,
    private route: ActivatedRoute
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.curriculumTopicsList = [];
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
          this.loadTrainingProgramCurriculumSection();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadTrainingProgramCurriculumSection() {
    this.trainingProgramCurriculumSectionService.getValue(this.id)
      .subscribe((data: TrainingProgramCurriculumSection[]) => {
        if (data !== undefined){
          this.trainingProgramCurriculumSections = data;
          // tslint:disable-next-line:only-arrow-functions typedef
          this.trainingProgramCurriculumSections.sort(function(a, b) {
            return a.sectionNumber - b.sectionNumber;
          });
          this.loadCurriculumTopicTrainingProgram();
        }
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumTopicTrainingProgram(){
    this.trainingProgramCurriculumSections.forEach((object, index) => {
      this.curriculumTopicTrainingProgramService.getValueList(
        this.id,
        object.curriculumSectionId,
        object.sectionNumber
      )
        .subscribe((data: CurriculumTopicTrainingProgram[]) => {
          if (data !== undefined){
            const curriculumTopicTrainingPrograms: CurriculumTopicTrainingProgram[] = data;
            // tslint:disable-next-line:only-arrow-functions typedef
            curriculumTopicTrainingPrograms.sort(function(a, b) {
              return a.serialNumber - b.serialNumber;
            });
            this.curriculumTopicsList.push(curriculumTopicTrainingPrograms);
            if (this.curriculumTopicsList.length === this.trainingProgramCurriculumSections.length) {
              this.getDocument();
            }
          }
        });
    });
  }

  // tslint:disable-next-line:typedef
  public getDocument() {
    const documentCreator = new DocumentCreator(
      this.curriculumTopicsList,
      this.trainingProgram,
      this.trainingProgramCurriculumSections
    );
    const docxTmp = documentCreator.create([
      model,
      empty
    ]);
    Packer.toBlob(docxTmp).then(blob => {
      this.docx = blob;
    });
  }
}
