import {Component, OnInit, ViewChild} from '@angular/core';
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

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
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
    //this.rte.format = {};
    //this.rte.ent.Document.ParagraphFormat.LineSpacing = 0.1;
    //const defaultRTE: SyncfusionRichTextEditorComponent = new SyncfusionRichTextEditorComponent();
  }

}
