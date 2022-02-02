import { Component, OnInit } from '@angular/core';
import {GroupService} from '../services/group.service';
import {TrainingProgramService} from '../services/training-program.service';
import {GroupScheduleGenerator} from '../models/generator-models/GroupScheduleGenerator';
import {TrainingProgramGenerator} from '../models/generator-models/TrainingProgramGenerator';
import {DocumentCreatorSchedule} from '../doxc-generator-Schedule/cv-generator-schedule';
import { saveAs } from 'file-saver';
import {Packer} from 'docx';
import {Group} from '../models/Group';
import {DocumentCreatorJournal} from "./cv-generator-journal";
import {TitlePageGenerator} from "./title-page-generator";

@Component({
  selector: 'app-journal-doc-generator',
  templateUrl: './journal-doc-generator.component.html',
  styleUrls: ['./journal-doc-generator.component.scss'],
  providers: [
    GroupService
  ],
})
export class JournalDocGeneratorComponent implements OnInit {

  constructor(
    // private route: ActivatedRoute
    private groupService: GroupService,
  ) {
  }
  docx: any[] = [];
  id: number;
  myDocx: any;

  ngOnInit(): void {
    const date = new Date();
    //this.loadGroup();
    this.getDocument();
  }

  loadGroup(): void{
    this.groupService.getValue(this.id)
      .subscribe((data: Group) => {
        if (data) {
          console.log(data);
        }
      });
  }

  public getDocument(): void {
    const documentCreator = new TitlePageGenerator();
    //const documentCreator = new DocumentCreatorJournal();
    const docxTmp = documentCreator.create();
    Packer.toBlob(docxTmp).then(blob => {
      this.docx.push(blob);
      this.myDocx = blob;
    });
  }

  downloadDocx(): void {
    saveAs(this.myDocx, `Журнал группы ПК-тест${123}.docx`);
  }

}
