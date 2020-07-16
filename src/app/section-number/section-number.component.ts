import { Component, OnInit } from '@angular/core';
import { ConsultationTopicService } from '../services/consultation-topic.service';
import { ConsultationTopic } from '../models/ConsultationTopic';

@Component({
  selector: 'app-section-number',
  templateUrl: './section-number.component.html',
  styleUrls: ['./section-number.component.css']
})
export class SectionNumberComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
