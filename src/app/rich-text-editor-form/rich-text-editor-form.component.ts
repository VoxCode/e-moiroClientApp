import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
  RichTextEditorComponent,
  ResizeService,
  QuickToolbarSettingsModel
} from '@syncfusion/ej2-angular-richtexteditor';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-rich-text-editor-form',
  templateUrl: './rich-text-editor-form.component.html',
  styleUrls: ['./rich-text-editor-form.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, ResizeService, HtmlEditorService]
})
export class RichTextEditorFormComponent implements OnInit {
  rteForm: FormGroup;

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

  constructor(private fb: FormBuilder) {
    // <--- inject FormBuilder
  }

  public quickToolbarSettings: QuickToolbarSettingsModel = {
    table: ['TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-', 'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign', 'Styles']
  };

  ngOnInit(): void {
    this.rteForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  rteCreated(): void {
    this.rteEle.element.focus();
  }

  onSubmit(): void {
    alert('Form submitted successfully');
  }
}
