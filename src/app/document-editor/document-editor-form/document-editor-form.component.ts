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
import {WordToSfdtService} from '../../services/word-to-sfdt.service';

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
    DocumentEditorTranslateData,
    WordToSfdtService]
})

export class DocumentEditorFormComponent implements OnChanges, AfterViewInit {
  public hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';

  @Input() docxContent: Blob;
  @Output() saveButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('documentEditorContainerComponent')
  public container: DocumentEditorContainerComponent;
  public path: string;
  public culture = 'ru';
  content: string;
  public saveDisable = false;

  constructor(
    private wordToSfdtService: WordToSfdtService
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
    this.loadFile(this.docxContent);
  }

  saveBlob(): void {
    this.container.documentEditor.saveAsBlob('Docx').then((blob: Blob) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const base64Text = ';base64,';
        if (typeof fileReader.result === 'string') {
          this.content = fileReader.result.substring(fileReader.result.indexOf(base64Text) + base64Text.length);
          this.saveButtonClicked.emit(this.content);
        }
      };
      fileReader.readAsDataURL(blob);
      this.saveDisable = false;
    });
  }

  saveDisableChange(): void {
    this.saveDisable = true;
  }
}
