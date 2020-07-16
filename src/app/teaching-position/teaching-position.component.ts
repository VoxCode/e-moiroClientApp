import { Component, OnInit } from '@angular/core';
import { TeachingPositionService } from '../services/teaching-position.service';
import { TeachingPosition } from '../models/TeachingPosition';

@Component({
  selector: 'app-teaching-position',
  templateUrl: './teaching-position.component.html',
  styleUrls: ['./teaching-position.component.css']
})
export class TeachingPositionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
