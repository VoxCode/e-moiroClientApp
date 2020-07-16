import { Component, OnInit } from '@angular/core';
import { FormOfEducationService } from '../services/form-of-education.service';
import { FormOfEducation } from '../models/FormOfEducation';

@Component({
  selector: 'app-form-of-education',
  templateUrl: './form-of-education.component.html',
  styleUrls: ['./form-of-education.component.css']
})
export class FormOfEducationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
