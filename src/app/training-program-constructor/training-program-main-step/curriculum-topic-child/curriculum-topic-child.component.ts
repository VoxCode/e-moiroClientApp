import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-curriculum-topic-child',
  templateUrl: './curriculum-topic-child.component.html',
  styles: [
  ]
})
export class CurriculumTopicChildComponent implements OnInit {

  constructor() { }

  @Input() i: number;
  @Input() item: any;

  ngOnInit(): void {
  }

}
