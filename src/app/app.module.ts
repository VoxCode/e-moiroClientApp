import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuardService} from './services/auth-guard.service';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {ErrorInterceptorService} from './services/error-interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AdditionalLiteratureComponent} from './additional-literature/additional-literature.component';
import {CurriculumSectionComponent} from './curriculum-section/curriculum-section.component';
import {CurriculumTopicComponent} from './curriculum-topic/curriculum-topic.component';
import {DepartmentComponent} from './department/department.component';
import {FormOfEducationComponent} from './form-of-education/form-of-education.component';
import {GroupComponent} from './group/group.component';
import {MainLiteratureComponent} from './main-literature/main-literature.component';
import {OccupationFormComponent} from './occupation-form/occupation-form.component';
import {TeacherComponent} from './teacher/teacher.component';
import {StudentCategoryComponent} from './student-category/student-category.component';
import {TeachingPositionComponent} from './teaching-position/teaching-position.component';
import {TrainingProgramComponent} from './training-program/training-program.component';
import {CurriculumTopicListComponent} from './curriculum-topic-list/curriculum-topic-list.component';
import {InputsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {AdditionalLiteratureEditComponent} from './additional-literature/additional-literature-edit.component';
import {MainLiteratureEditComponent} from './main-literature/main-literature-edit.component';
import {RegulationEditComponent} from './regulation/regulation-edit.component';
import {DepartmentEditComponent} from './department/department-edit.component';
import {FormOfEducationEditComponent} from './form-of-education/form-of-education-edit.component';
import {TeachingPositionEditComponent} from './teaching-position/teaching-position-edit.component';
import {TeacherEditComponent} from './teacher/teacher-edit.component';
import {CurriculumSectionEditComponent} from './curriculum-section/curriculum-section-edit.component';
import {CurriculumTopicAddFormComponent} from './curriculum-topic-add-form/curriculum-topic-add-form.component';
import {StudentCategoryEditComponent} from './student-category/student-category-edit.component';
import {CurriculumTopicEditComponent} from './curriculum-topic/curriculum-topic-edit.component';
import {OccupationFormEditComponent} from './occupation-form/occupation-form-edit.component';
import {GroupAddComponent} from './group/group-add.component';
import {DocxGeneratorComponent} from './docx-generator/docx-generator.component';
import {CertificationTypeComponent} from './certification-type/certification-type.component';
import {FinalExaminationComponent} from './final-examination/final-examination.component';
import {TestWorkComponent} from './test-work/test-work.component';
import {TestWorkEditComponent} from './test-work/test-work-edit.component';
import {TrainingProgramAddFormComponent} from './training-program-add-form/training-program-add-form.component';
import {FinalExaminationEditComponent} from './final-examination/final-examination-edit.component';
import {CertificationTypeEditComponent} from './certification-type/certification-type-edit.component';
import {TrainingProgramEditComponent} from './training-program/training-program-edit.component';
import {RegulationComponent} from './regulation/regulation.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CurriculumSectionChild} from './training-program-add-form/curriculum-section-child';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import {CommonService} from './common-service/common-service.component';
import {DocumentEditorAllModule, DocumentEditorContainerModule} from '@syncfusion/ej2-angular-documenteditor';
import {DocumentEdComponent} from './document-ed/document-ed.component';
import { TrainingProgramDocxGeneratorComponent } from './training-program-docx-generator/training-program-docx-generator.component';
import { TrainingProgramAddForm2Component } from './training-program-add-form2/training-program-add-form2.component';
import { TrainingProgramStepperComponent } from './training-program-stepper/training-program-stepper.component';
import { TrainingProgramAddForm3Component } from './training-program-add-form3/training-program-add-form3.component';
import { TrainingProgramAddForm4Component } from './training-program-add-form4/training-program-add-form4.component';
import { TrainingProgramAddForm5Component } from './training-program-add-form5/training-program-add-form5.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdditionalLiteratureComponent,
    AdditionalLiteratureEditComponent,
    CurriculumSectionComponent,
    CurriculumSectionEditComponent,
    CurriculumTopicComponent,
    CurriculumTopicEditComponent,
    DepartmentComponent,
    DepartmentEditComponent,
    FormOfEducationComponent,
    FormOfEducationEditComponent,
    GroupComponent,
    GroupAddComponent,
    MainLiteratureComponent,
    MainLiteratureEditComponent,
    OccupationFormComponent,
    OccupationFormEditComponent,
    TeacherComponent,
    TeacherEditComponent,
    StudentCategoryComponent,
    StudentCategoryEditComponent,
    TeachingPositionComponent,
    TeachingPositionEditComponent,
    TrainingProgramComponent,
    TrainingProgramEditComponent,
    RegulationComponent,
    RegulationEditComponent,
    CurriculumTopicListComponent,
    CurriculumTopicAddFormComponent,
    DocxGeneratorComponent,
    CertificationTypeComponent,
    CertificationTypeEditComponent,
    FinalExaminationEditComponent,
    FinalExaminationComponent,
    TestWorkComponent,
    TestWorkEditComponent,
    TrainingProgramAddFormComponent,
    CurriculumSectionChild,
    DocumentEdComponent,
    TrainingProgramDocxGeneratorComponent,
    TrainingProgramAddForm2Component,
    TrainingProgramStepperComponent,
    TrainingProgramAddForm3Component,
    TrainingProgramAddForm4Component,
    TrainingProgramAddForm5Component
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        InputsModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        FormsModule,
        NgSelectModule,
        NgOptionHighlightModule,
        DocumentEditorContainerModule,
        DocumentEditorAllModule,
        DragDropModule
    ],
  providers: [
    AuthService,
    CommonService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
