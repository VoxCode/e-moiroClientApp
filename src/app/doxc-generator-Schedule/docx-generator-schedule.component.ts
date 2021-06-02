import {Component, OnInit} from '@angular/core';
import { Packer } from 'docx';
import {DocumentCreatorSchedule} from './cv-generator-schedule';

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator-schedule.component.html',
  styleUrls: ['./docx-generator-schedule.component.scss'],
  providers: [
  ]
})

export class DocxGeneratorScheduleComponent implements OnInit{
  docx: any[] = [];
  isBLR = false;

  constructor(
  ) { }

  ngOnInit(): void {
    const date = new Date();
    this.getDocument();
  }

  public getDocument(): void {
    const documentCreator = new DocumentCreatorSchedule(
      this.isBLR,
    );
    const docxTmp = documentCreator.create();
    Packer.toBlob(docxTmp).then(blob => {
      this.docx.push(blob);
    });
  }

  generateDocRU(): void {
    this.isBLR = false;
  }

  generateDocBLR(): void {
    this.isBLR = true;
  }
}
