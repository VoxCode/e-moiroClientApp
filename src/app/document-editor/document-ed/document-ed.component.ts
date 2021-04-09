import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  DocumentEditorContainerComponent,
  EditorService,
  SelectionService,
  SfdtExportService,
  ToolbarService,
  WordExportService
} from '@syncfusion/ej2-angular-documenteditor';
import {TrainingProgram} from '../../models/TrainingProgram';
import {DocxMergeService} from '../../services/docx-merge.service';
import {DocumentEditorTranslateData} from '../document-editor-translate-data';

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
    DocumentEditorTranslateData]
})

export class DocumentEdComponent implements OnChanges, AfterViewInit {
  public hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';

  @Input() docx: any[];
  @Input() trainingProgram: TrainingProgram;
  @ViewChild('documentEditorContainerComponent')
  public container: DocumentEditorContainerComponent;
  public path: string;
  public culture = 'ru';


  constructor(
    private docxMergeService: DocxMergeService
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
        this.path = environment.apiUrl + 'api/WordToSDFT';
        this.loadFile(file);
      }
    }
  }

// Ajax Converter to SFDT
  public loadFile(file: any): void {
    const ajax: XMLHttpRequest = new XMLHttpRequest();
    ajax.open('POST', this.path, true);
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        if (ajax.status === 200 || ajax.status === 304) {
          this.container.documentEditor.open(ajax.responseText);
        }
        else {
          alert('Ошибка соединения с сервером!');
        }
      }
    };
    const formData: FormData = new FormData();
    formData.append('files', file);
    ajax.send(formData);
  }

  onCreate(): any {
    this.path = environment.apiUrl + 'api/WordToSDFT';
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
    this.container.documentEditor.save(this.trainingProgram.name + '(УТП)', 'Docx');
  }
}
