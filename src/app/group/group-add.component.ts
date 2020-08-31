import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { GroupService } from '../services/group.service';
import { Group } from '../models/Group';

@Component({
  selector: 'app-group',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss'],
  providers: [GroupService]
})
export class GroupAddComponent implements OnInit {
  value: Group = new Group();
  values: Group[];

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl(''),
    third: new FormControl(''),
    fourth: new FormControl(''),
    fifth: new FormControl(''),
    sixth: new FormControl(''),
    seventh: new FormControl(''),
    eight: new FormControl(''),
    ninth: new FormControl(''),
    tenth: new FormControl(''),
    last: new FormControl('', Validators.required)
  });

  constructor(private valueService: GroupService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {

  }
}
