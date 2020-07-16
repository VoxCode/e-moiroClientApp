import { Component, OnInit } from '@angular/core';
import { CurriculumTopicService } from '../services/curriculum-topic.service';
import { CurriculumTopic } from '../models/CurriculumTopic';

@Component({
  selector: 'app-curriculum-topic',
  templateUrl: './curriculum-topic.component.html',
  styleUrls: ['./curriculum-topic.component.css']
})
export class CurriculumTopicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
