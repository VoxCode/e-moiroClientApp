import { Component, OnInit } from '@angular/core';
import { Packer } from "docx";
import { saveAs } from "file-saver/FileSaver";

@Component({
  selector: 'app-docx-generator',
  templateUrl: './docx-generator.component.html',
  styleUrls: ['./docx-generator.component.scss']
})
export class DocxGeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
