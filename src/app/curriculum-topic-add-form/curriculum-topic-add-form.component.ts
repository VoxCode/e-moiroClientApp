import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-curriculum-topic-add-form',
  templateUrl: './curriculum-topic-add-form.component.html',
  styleUrls: ['./curriculum-topic-add-form.component.scss']
})
export class CurriculumTopicAddFormComponent implements OnInit {
form: FormGroup;
  public addresses: any[] = [{
    address: '',
    street: '',
    city: '',
    country: ''
  }];


  ngOnInit(): void {
this.form = new FormGroup( {
  skills: new FormArray([])
});
  }

  // tslint:disable-next-line:typedef
  getEdit() {
    console.log('fdfdfd');
    const control = new FormControl();
    (this.form.get('skills') as FormArray).push(control);

    this.addresses.push({
      address: '',
      street: '',
      city: '',
      country: ''
    });
  }
}
