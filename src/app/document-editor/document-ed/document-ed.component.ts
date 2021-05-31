import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {
  DocumentEditorContainerComponent,
  EditorService,
  SelectionService,
  SfdtExportService,
  ToolbarService,
  WordExportService
} from '@syncfusion/ej2-angular-documenteditor';
import {DocxMergeService} from '../../services/docx-merge.service';
import {DocumentEditorTranslateData} from '../document-editor-translate-data';
import {WordToSfdtService} from '../../services/word-to-sfdt.service';

@Component({
  selector: 'app-document-ed',
  templateUrl: './document-ed.component.html',
  styleUrls: ['./document-ed.component.scss'],
  providers: [
    ToolbarService,
    EditorService,
    SelectionService,
    SfdtExportService,
    WordExportService,
    DocxMergeService,
    WordToSfdtService,
    DocumentEditorTranslateData]
})

export class DocumentEdComponent implements OnChanges, AfterViewInit {
  public hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';

  @Input() docx: any[];
  @Input() trainingProgramName: string;
  @Input() docxType: number;
  @ViewChild('documentEditorContainerComponent')
  public container: DocumentEditorContainerComponent;
  public path: string;
  public culture = 'ru';


  constructor(
    private docxMergeService: DocxMergeService,
    private wordToSfdtService: WordToSfdtService,
  ) { }

  ngAfterViewInit(): void {
    this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onCreate();

  }

  public onFileChange(e: any): void {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.substr(file.name.lastIndexOf('.')) !== '.sfdt') {
        this.loadFile(file);
      }
    }
  }

  public loadFile(file: any): void {
    this.wordToSfdtService.convert(file).subscribe((data: string) => {
      this.container.documentEditor.open(data);
    });
  }

  onCreate(): any {
    if (this.docx.length > 1) {
      this.docxMergeService.merge(this.docx).subscribe((data: string) => {
        this.container.documentEditor.open(data);
      });
    }
    else {
      this.loadFile(this.docx[0]);
    }
  }

  public onPrint(): void {
    this.container.documentEditor.print();
  }

  public saveAsDocx(): void {
    let type;
    switch (this.docxType) {
      case 1: type = 'УП'; break;
      case 2: type = 'УТП'; break;
      case 3: type = 'Расписание'; break;
    }
    this.container.documentEditor.save(this.trainingProgramName + '(' + type + ')', 'Docx');
  }
}
