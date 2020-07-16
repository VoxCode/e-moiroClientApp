import { Component, OnInit } from '@angular/core';
import { TeacherCategoryService } from '../services/teacher-category.service';
import { TeacherCategory } from '../models/TeacherCategory';

@Component({
  selector: 'app-teacher-category',
  templateUrl: './teacher-category.component.html',
  styleUrls: ['./teacher-category.component.css']
})
export class TeacherCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
