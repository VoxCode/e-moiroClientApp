import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";


const MatComponents = [
  MatButtonModule,
  MatNativeDateModule,
  MatInputModule,
  MatDatepickerModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule,
  CommonModule,
];


@NgModule({
  imports: [MatComponents],
  exports: [MatComponents],
})
export class AngularMaterialModule { }
