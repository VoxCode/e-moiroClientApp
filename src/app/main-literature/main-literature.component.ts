import { Component, OnInit } from '@angular/core';
import { MainLiteratureService } from '../services/main-literature.service';
import { MainLiterature } from '../models/MainLiterature';

@Component({
  selector: 'app-main-literature',
  templateUrl: './main-literature.component.html',
  styleUrls: ['./main-literature.component.css']
})
export class MainLiteratureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
