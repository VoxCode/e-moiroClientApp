import { Component, OnInit } from '@angular/core';
import {Globals} from '../globals';

@Component({
  selector: 'app-curriculum-topic-list',
  templateUrl: './curriculum-topic-list.component.html',
  styleUrls: ['./curriculum-topic-list.component.scss']
})
export class CurriculumTopicListComponent implements OnInit {
  constructor(public globals: Globals) { }

  ngOnInit(): void {
  }
}
