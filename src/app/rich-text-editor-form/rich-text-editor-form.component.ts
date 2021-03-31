import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rich-text-editor-form',
  templateUrl: './rich-text-editor-form.component.html',
  styleUrls: ['./rich-text-editor-form.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class RichTextEditorFormComponent implements OnInit {
  rteForm: FormGroup;

  @ViewChild('fromRTE')
  private rteEle: RichTextEditorComponent;

  constructor(private fb: FormBuilder) {
    // <--- inject FormBuilder
  }

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
