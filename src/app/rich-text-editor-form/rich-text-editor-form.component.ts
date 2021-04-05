import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
  RichTextEditorComponent,
  ResizeService,
  QuickToolbarSettingsModel
} from '@syncfusion/ej2-angular-richtexteditor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-rich-text-editor-form',
  templateUrl: './rich-text-editor-form.component.html',
  styleUrls: ['./rich-text-editor-form.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, ResizeService, HtmlEditorService]
})
export class RichTextEditorFormComponent implements OnInit {
  @Input() content: string;
  @Output() saveButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  public editableRow: { content: string };

  @ViewChild('fromRTE')
  private rteEle: RichTextEditorComponent;
  public tools: ToolbarModule = {
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
      'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
      'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
      'Outdent', 'Indent', '|',
      'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat',
      'SourceCode', '|', 'Undo', 'Redo']
  };

  public quickToolbarSettings: QuickToolbarSettingsModel = {
    table: ['TableHeader', 'TableRows', 'TableColumns',
      'TableCell', '-', 'BackgroundColor', 'TableRemove',
      'TableCellVerticalAlign', 'Styles']
  };

  public rteForm: FormGroup = new FormGroup({
    content: new FormControl(null, Validators.required)
  });

  constructor() {
  }

  ngOnInit(): void {
      console.log(this.content);
      this.rteForm.controls.content.patchValue(this.content);
  }

  rteCreated(): void {
    this.rteEle.element.focus();
  }

  onSubmit(): void {
    this.editableRow = this.rteForm.getRawValue();
    this.saveButtonClicked.emit(this.editableRow);
  }
}
