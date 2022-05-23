import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';


const MatComponents = [
  MatButtonModule,
  MatNativeDateModule,
  MatInputModule,
  MatDatepickerModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  CommonModule,
  MatTooltipModule,
];


@NgModule({
  imports: [MatComponents],
  exports: [MatComponents],
})
export class AngularMaterialModule {
}
