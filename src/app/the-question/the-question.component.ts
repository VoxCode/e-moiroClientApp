import { Component, OnInit } from '@angular/core';
import { TheQuestionService } from '../services/the-question.service';
import { TheQuestion } from '../models/TheQuestion';

@Component({
  selector: 'app-the-question',
  templateUrl: './the-question.component.html',
  styleUrls: ['./the-question.component.css']
})
export class TheQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
