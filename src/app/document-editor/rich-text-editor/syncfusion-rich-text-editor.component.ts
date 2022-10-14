import {Component, Input, OnInit, Output, ViewChild, EventEmitter, OnDestroy} from '@angular/core';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  MarkdownEditorService,
  ToolbarService,
  RichTextEditorComponent
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './syncfusion-rich-text-editor.component.html',
  styleUrls: ['./syncfusion-rich-text-editor.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, MarkdownEditorService]
})
export class SyncfusionRichTextEditorComponent implements OnInit {

  @ViewChild('RTE')
  public RTE: RichTextEditorComponent;
  @Input() content: string;
  @Output() richTextContentEmitter = new EventEmitter<string>();

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', '|',
      'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'SourceCode', '|', 'FullScreen']
  };
  // @ViewChild('richTextEditor') rte: RichTextEditorComponent;
  // public tools: object = {
  //   items: ['Undo', 'Redo', '|',
  //     'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
  //     'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
  //     'SubScript', 'SuperScript', '|',
  //     'LowerCase', 'UpperCase', '|',
  //     'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
  //     'Indent', 'Outdent', '|', 'CreateLink',
  //     'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  // };



  constructor() { }

  ngOnInit(): void {
  }

  onRTECreate(e: any): void {
    this.setValue(this.content);
  }

  getValue(): string{
    return this.RTE.value;
  }

  setValue(val: string): void{
    this.RTE.writeValue(val);
  }

  saveRichText(): void {
    this.richTextContentEmitter.emit(this.getValue());
  }
}
