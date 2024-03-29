import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {UserService} from '../../services/user.service';
import {RoleService} from '../../services/role.service';
import {User} from '../../models/User';
import {UserEditComponent} from './user-edit.component';
import {RoleChangeModel} from '../../models/RoleChangeModel';
import {AuthService} from '../../services/security/auth.service';
import {IsDeleteComponent} from '../../is-delete/is-delete.component';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, RoleService, AuthService]
})
export class UserComponent implements OnInit, AfterViewInit {

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

  @HostListener('input') oninput = () => {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit(): void {
    this.loadValue();
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems(): void {
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

  loadValue(): void {
    this.valueService.getValues()
      .subscribe((data: User[]) => {
        data.forEach((obj, index) => {
          this.elements.push({
            id: ++index,
            first: obj.email,
            second: obj.userName,
            third: obj.id,
            fourth: obj.teacherId,
            last: obj.role});
        });
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  save(newEl: any, oldEl: any): void {
    const roleChangeModel: RoleChangeModel = new RoleChangeModel(oldEl.second, oldEl.last, newEl.last);
    this.authService.changeRole(roleChangeModel)
      .subscribe(() => {}, () => { location.reload(); alert('Ошибка изменения роли!'); });
  }

  delete(p: any): void {
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
        editableRow: { heading: p.second }
      }
    };
    this.modalRef = this.modalService.show(IsDeleteComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      if (newElement) {
        this.valueService.deleteValue(p.third)
          .subscribe(() => {
            this.removeRow(p);
          });
      }
    });
  }

  removeRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    this.mdbTable.getDataSource().forEach((value: any, index: any) => {
      value.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.elements);
  }

  editRow(el: any): void {
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
