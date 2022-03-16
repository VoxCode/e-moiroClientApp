import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


const MatComponents = [
  MatButtonModule,
  MatNativeDateModule,
  MatInputModule,
  MatDatepickerModule,
  MatIconModule,
  MatDialogModule,
  CommonModule,
];


@NgModule({
  imports: [MatIconModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule, MatInputModule, MatDialogModule, CommonModule ],
  exports: [MatIconModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule, MatInputModule, MatDialogModule],
})
export class AngularMaterialModule { }
