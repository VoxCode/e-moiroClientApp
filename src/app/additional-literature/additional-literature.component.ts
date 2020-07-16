import { Component, OnInit } from '@angular/core';
import { AdditionalLiteratureService } from '../services/additional-literature.service';
import { AdditionalLiterature } from '../models/AdditionalLiterature';

@Component({
  selector: 'app-additional-literature',
  templateUrl: './additional-literature.component.html',
  styleUrls: ['./additional-literature.component.css']
})
export class AdditionalLiteratureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
