import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from '@angular/router';
import {TrainingProgram} from '../../models/TrainingProgram';
import {FinalExaminationService} from '../../services/final-examination.service';
import {FinalExamination} from '../../models/FinalExamination';
import {TrainingProgramFinalExaminationService} from '../../services/training-program-final-examination.service';
import {TrainingProgramFinalExamination} from '../../models/TrainingProgramFinalExamination';
import {CertificationTypeService} from '../../services/certification-type.service';
import {CertificationType} from '../../models/CertificationType';
import {Globals} from '../../globals';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {TrainingProgramConstructorService} from '../training-program-constructor.service';
import {FinalExaminationEditComponent} from '../../final-examination/final-examination-edit.component';
import {IsDeleteComponent} from '../../is-delete/is-delete.component';

@Component({
  selector: 'app-training-program-certification-step',
  templateUrl: './training-program-certification-step.component.html',
  styleUrls: ['./training-program-certification-step.component.scss'],
  providers: [
    FinalExaminationService,
    TrainingProgramFinalExaminationService,
    CertificationTypeService
  ]
})
export class TrainingProgramCertificationStepComponent implements OnInit {
  id: number;
  trainingProgram: TrainingProgram;
  certificationType: CertificationType = new CertificationType();
  modalRef: MDBModalRef;
  heading = 'Рекомендуемые вопросы';

  constructor(
    public globals: Globals,
    public  trainingProgramConstructorService: TrainingProgramConstructorService,
    private finalExaminationService: FinalExaminationService,
    private trainingProgramFinalExaminationService: TrainingProgramFinalExaminationService,
    private certificationTypeService: CertificationTypeService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.loadTrainingProgram();
  }

  loadTrainingProgram(): void {
    this.trainingProgramConstructorService.TrainingProgram(this.id)
      .subscribe((trainingProgramResponse: TrainingProgram) => {
        this.trainingProgram = trainingProgramResponse;
        this.loadCertificationType();
      });
  }

  loadCertificationType(): void {
    this.certificationTypeService.getValue(this.trainingProgram.certificationTypeId)
      .subscribe((certificationType: CertificationType) => {
        if (certificationType){
          this.certificationType = certificationType;
        }
      });
  }
}
