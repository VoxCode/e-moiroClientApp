import { Component, OnInit } from '@angular/core';
import { ConsultationTopicService } from '../services/consultation-topic.service';
import { ConsultationTopic } from '../models/ConsultationTopic';

@Component({
  selector: 'app-consultation-topic',
  templateUrl: './consultation-topic.component.html',
  styleUrls: ['./consultation-topic.component.css']
})
export class ConsultationTopicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
