import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MDBModalRef} from 'angular-bootstrap-md';
import {OccupationFormService} from '../services/occupation-form.service';
import {CurriculumSectionService} from '../services/curriculum-section.service';
import {OccupationForm} from '../models/OccupationForm';
import {CurriculumSection} from '../models/CurriculumSection';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './curriculum-topic-edit.component.html',
  providers: [OccupationFormService, CurriculumSectionService]
})
export class CurriculumTopicEditComponent {
  occupationForms: OccupationForm[];
  curriculumSections: CurriculumSection[];
  public editableRow: {
    id: string,
    first: string,
    second: string,
    third: string,
    fourth: string,
    fifth: string,
    sixth: string,
    seventh: string,
    eighth: string,
    last: string,
    handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl({value: '', disabled: true}),
    second: new FormControl('', Validators.required),
    third: new FormControl('', Validators.required),
    fourth: new FormControl('', Validators.required),
    fifth: new FormControl(''),
    sixth: new FormControl(''),
    last: new FormControl('')
  });

  constructor(public modalRef: MDBModalRef,
              private occupationFormService: OccupationFormService,
              private curriculumSectionService: CurriculumSectionService) { }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.loadOccupationForm();
    this.loadCurriculumSection();

    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.second.patchValue(this.editableRow.second);
    this.form.controls.third.patchValue(this.editableRow.third);
    this.form.controls.fourth.patchValue(this.editableRow.fourth);
    this.form.controls.fifth.patchValue(this.editableRow.fifth);
    this.form.controls.sixth.patchValue(this.editableRow.sixth);
    this.form.controls.last.patchValue(this.editableRow.last);
  }

  // tslint:disable-next-line:typedef
  editRow() {
    this.editableRow = this.form.getRawValue();
    this.editableRow.seventh = this.curriculumSections.find(p => p.id === +this.editableRow.fifth).name;
    this.editableRow.eighth = this.occupationForms.find(p => p.id === +this.editableRow.sixth).fullName;
    console.log(this.editableRow);
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  // tslint:disable-next-line:typedef
  get first() { return this.form.get('first'); }
  // tslint:disable-next-line:typedef
  get second() { return this.form.get('second'); }
  // tslint:disable-next-line:typedef
  get third() { return this.form.get('third'); }
  // tslint:disable-next-line:typedef
  get fourth() { return this.form.get('fourth'); }
  // tslint:disable-next-line:typedef
  get fifth() { return this.form.get('fifth'); }
  // tslint:disable-next-line:typedef
  get sixth() { return this.form.get('sixth'); }
  // tslint:disable-next-line:typedef
  get last() { return this.form.get('last'); }

  // tslint:disable-next-line:typedef
  loadOccupationForm() {
    this.occupationFormService.getValues()
      .subscribe((data: OccupationForm[]) => {
        this.occupationForms = data;
      });
  }

  // tslint:disable-next-line:typedef
  loadCurriculumSection() {
    this.curriculumSectionService.getValues()
      .subscribe((data: CurriculumSection[]) => {
        this.curriculumSections = data;
      });
  }
}
