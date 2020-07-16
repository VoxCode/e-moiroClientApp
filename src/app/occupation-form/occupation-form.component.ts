import { Component, OnInit } from '@angular/core';
import { OccupationFormService } from '../services/occupation-form.service';
import { OccupationForm } from '../models/OccupationForm';

@Component({
  selector: 'app-occupation-form',
  templateUrl: './occupation-form.component.html',
  styleUrls: ['./occupation-form.component.css']
})
export class OccupationFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
