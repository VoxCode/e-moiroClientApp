import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {UserService} from '../../services/user.service';
import {RoleService} from '../../services/role.service';
import {User} from '../../models/User';
import {UserEditComponent} from './user-edit.component';
import {RoleChangeModel} from '../../models/RoleChangeModel';
import {AuthService} from '../../services/security/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, RoleService, AuthService]
})
export class UserComponent implements OnInit, AfterViewInit {
  value: User = new User();
  values: User[];

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'Email', 'Логин', 'Роль', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: UserService,
    private roleService: RoleService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) { }

  // tslint:disable-next-line:typedef
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  // tslint:disable-next-line:typedef
  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: User[]) => {
        this.values = data;
        for (let i = 1; i <= this.values.length; i++) {
          this.elements.push({
            id: i.toString(),
            first: this.values[i - 1].email,
            second: this.values[i - 1].userName,
            last: this.values[i - 1].role});
        }
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  // tslint:disable-next-line:typedef
  crate(){
    this.valueService.createValue(this.value)
      .subscribe((data: User) => {
        // this.values.push(data);
        this.value = data;
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: this.value.email,
          second: this.value.userName,
          last: this.value.role
        });
        this.mdbTable.setDataSource(this.elements);
        this.cancel();
      });
  }

  // tslint:disable-next-line:typedef
  save(newEl: any, oldEl: any) {
    this.cancel();
    // const roleChangeModel: RoleChangeModel = new RoleChangeModel(newEl.);
    // console.log(roleChangeModel);
    // this.authService.changeRole(roleChangeModel)
    //   .subscribe();
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: User) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new User();
  }
  // tslint:disable-next-line:typedef
  delete(p: any) {
    this.value.id = p.first;
    this.value.userName = p.last;
    this.valueService.deleteValue(this.value.id)
      .subscribe(data => {
        this.removeRow(p);
      });
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
  }

  // tslint:disable-next-line:typedef
  removeRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    // tslint:disable-next-line:no-shadowed-variable
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.elements);
    this.cancel();
  }

  // tslint:disable-next-line:typedef
  editRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-fluid',
      containerClass: '',
      animated: true,
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(UserEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement, el);
    });
    this.mdbTable.setDataSource(this.elements);
  }
}
