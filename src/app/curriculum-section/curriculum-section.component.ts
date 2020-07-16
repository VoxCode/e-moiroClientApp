import { Component, OnInit } from '@angular/core';
import { CurriculumSectionService } from '../services/curriculum-section.service';
import { CurriculumSection } from '../models/CurriculumSection';

@Component({
  selector: 'app-curriculum-section',
  templateUrl: './curriculum-section.component.html',
  styleUrls: ['./curriculum-section.component.css']
})
export class CurriculumSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
