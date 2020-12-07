import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DocumentEditorContainerComponent,
  EditorService,
  SelectionService,
  SfdtExportService,
  ToolbarService,
  WordExportService
} from '@syncfusion/ej2-angular-documenteditor';

@Component({
  selector: 'app-document-ed',
  templateUrl: './document-ed.component.html',
  styleUrls: ['./document-ed.component.scss'],
  providers: [
    ToolbarService,
    EditorService,
    SelectionService,
    SfdtExportService,
    WordExportService]
})
export class DocumentEdComponent implements OnInit {

  @ViewChild('documentEditorContainerComponent')
  public  dd: DocumentEditorContainerComponent;

  constructor() { }

  ngOnInit(): void {
  }
  public saveAsDocx(): void {
    this.dd.documentEditor.save('sample', 'Docx');
  }
}
