import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { GroupService } from '../services/group.service';
import { Group } from '../models/Group';
import {FormOfEducation} from '../models/FormOfEducation';
import {FormOfEducationService} from '../services/form-of-education.service';

@Component({
  selector: 'app-group',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss'],
  providers: [
    GroupService,
    FormOfEducationService ]
})
export class GroupAddComponent implements OnInit {
  value: Group = new Group();
  values: Group[];

  formOfEducation: FormOfEducation;
  formOfEducations: FormOfEducation[];

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl(''),
    third: new FormControl(''),
    fourth: new FormControl(''),
    fifth: new FormControl('0'),
    sixth: new FormControl(''),
    seventh: new FormControl(''),
    eight: new FormControl(''),
    ninth: new FormControl(''),
    tenth: new FormControl('')
  });

  constructor(private valueService: GroupService, private formOfEducationService: FormOfEducationService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadFormOfEducation();
  }

  // tslint:disable-next-line:typedef
  loadFormOfEducation() {
    this.formOfEducationService.getValues()
      .subscribe((data: FormOfEducation[]) => {
        this.formOfEducations = data;
      });
  }
}
