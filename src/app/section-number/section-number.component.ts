import { Component, OnInit } from '@angular/core';
import { SectionNumberService } from '../services/section-number.service';
import { SectionNumber } from '../models/SectionNumber';

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
