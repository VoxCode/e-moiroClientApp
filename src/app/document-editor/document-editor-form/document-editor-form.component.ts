import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  DocumentEditorContainerComponent,
  EditorService,
  SelectionService,
  SfdtExportService,
  ToolbarService, WordExportService
} from '@syncfusion/ej2-angular-documenteditor';
import {DocumentEditorTranslateData} from '../document-editor-translate-data';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-document-editor-form',
  templateUrl: './document-editor-form.component.html',
  styleUrls: ['./document-editor-form.component.scss'],
  providers: [
    ToolbarService,
    EditorService,
    SelectionService,
    SfdtExportService,
    WordExportService,
    DocumentEditorTranslateData]
})

export class DocumentEditorFormComponent implements OnChanges, AfterViewInit {
  public hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';

  @Input() content: string;
  @Output() saveButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('documentEditorContainerComponent')
  public container: DocumentEditorContainerComponent;
  public path: string;
  public culture = 'ru';
  public outputContent: string;

  constructor(
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
    if (this.content !== 'Empty') {

      const byteCharacters = atob(this.content);
      const sliceSize = 512;
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const bytes = new Uint8Array(byteNumbers);
        byteArrays.push(bytes);
      }
      const blob = new Blob(byteArrays, {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
      this.loadFile(blob);
    }
  }

  saveBlob(): void {
    this.container.documentEditor.saveAsBlob('Docx').then((blob: Blob) => {
      blob.text().then(text => {
        this.outputContent = text;
        this.content = this.outputContent;
        // this.saveButtonClicked.emit(this.outputContent);
      });
    });
  }

  reload(): void {
    this.onCreate();
  }
}
