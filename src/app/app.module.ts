import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './authorization/login/login.component';
import {RegisterComponent} from './authorization/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptorService} from './services/security/error-interceptor.service';
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
import {TrainingProgramComponent} from './training-program/training-program.component';
import {CurriculumTopicListComponent} from './curriculum-topic-list/curriculum-topic-list.component';
import {InputsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {AdditionalLiteratureEditComponent} from './additional-literature/additional-literature-edit.component';
import {MainLiteratureEditComponent} from './main-literature/main-literature-edit.component';
import {RegulationEditComponent} from './regulation/regulation-edit.component';
import {DepartmentEditComponent} from './department/department-edit.component';
import {FormOfEducationEditComponent} from './form-of-education/form-of-education-edit.component';
import {TeacherEditComponent} from './teacher/teacher-edit.component';
import {CurriculumSectionEditComponent} from './curriculum-section/curriculum-section-edit.component';
import {CurriculumTopicAddFormComponent} from './curriculum-topic-add-form/curriculum-topic-add-form.component';
import {StudentCategoryEditComponent} from './student-category/student-category-edit.component';
import {CurriculumTopicEditComponent} from './curriculum-topic/curriculum-topic-edit.component';
import {OccupationFormEditComponent} from './occupation-form/occupation-form-edit.component';
import {DocxGeneratorATPComponent} from './docx-generator-ATP/docx-generator-ATP.component';
import {CertificationTypeComponent} from './certification-type/certification-type.component';
import {FinalExaminationComponent} from './final-examination/final-examination.component';
import {TestWorkComponent} from './test-work/test-work.component';
import {TestWorkEditComponent} from './test-work/test-work-edit.component';
import {FinalExaminationEditComponent} from './final-examination/final-examination-edit.component';
import {CertificationTypeEditComponent} from './certification-type/certification-type-edit.component';
import {TrainingProgramEditComponent} from './training-program/training-program-edit.component';
import {RegulationComponent} from './regulation/regulation.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import {CommonService} from './common-service/common-service.component';
import {DocumentEditorAllModule, DocumentEditorContainerModule} from '@syncfusion/ej2-angular-documenteditor';
import {DocumentEdComponent} from './document-editor/document-ed/document-ed.component';
import {DocxGeneratorTPComponent} from './docx-generator-TP/docx-generator-TP.component';
import { JwtModule } from '@auth0/angular-jwt';
import {AuthService} from './services/security/auth.service';
import {TokenInterceptorService} from './services/security/token-interceptor.service';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { CreatorAreaComponent } from './creator-area/creator-area.component';
import { EditorAreaComponent } from './editor-area/editor-area.component';
import { DeanAreaComponent } from './dean-area/dean-area.component';
import { ViewerAreaComponent } from './viewer-area/viewer-area.component';
import { UserComponent } from './admin-area/users/user.component';
import { UserEditComponent } from './admin-area/users/user-edit.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import {Globals} from './globals';
import { TeacherDepartmentAddFormComponent } from './teacher/teacher-department-add-form/teacher-department-add-form.component';
import { ExpertComponent } from './expert/expert.component';
import {ExpertEditComponent} from './expert/expert-edit.component';
import {TrainingProgramConstructorModule} from './training-program-constructor/training-program-constructor.module';
import {DocxGeneratorScheduleComponent} from './doxc-generator-Schedule/docx-generator-schedule.component';
import {CurriculumTopicTemplateComponent} from './curriculum-topic/curriculum-topic-template.component';
import {IsDeleteComponent} from './is-delete/is-delete.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {ViewerHelloPageComponent} from './viewer-area/viewer-hello-page.component/viewer-hello-page.component';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}
registerLocaleData(localeRu, 'ru');

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
    CurriculumTopicTemplateComponent,
    CurriculumTopicEditComponent,
    DepartmentComponent,
    DepartmentEditComponent,
    FormOfEducationComponent,
    FormOfEducationEditComponent,
    GroupComponent,
    MainLiteratureComponent,
    MainLiteratureEditComponent,
    OccupationFormComponent,
    OccupationFormEditComponent,
    TeacherComponent,
    TeacherEditComponent,
    StudentCategoryComponent,
    StudentCategoryEditComponent,
    TrainingProgramComponent,
    TrainingProgramEditComponent,
    RegulationComponent,
    RegulationEditComponent,
    CurriculumTopicListComponent,
    CurriculumTopicAddFormComponent,
    DocxGeneratorATPComponent,
    DocxGeneratorTPComponent,
    DocxGeneratorScheduleComponent,
    CertificationTypeComponent,
    CertificationTypeEditComponent,
    FinalExaminationEditComponent,
    FinalExaminationComponent,
    TestWorkComponent,
    TestWorkEditComponent,
    DocumentEdComponent,
    AdminAreaComponent,
    CreatorAreaComponent,
    EditorAreaComponent,
    DeanAreaComponent,
    ViewerAreaComponent,
    UserComponent,
    UserEditComponent,
    AuthorizationComponent,
    TeacherDepartmentAddFormComponent,
    ExpertComponent,
    ExpertEditComponent,
    IsDeleteComponent,
    ViewerHelloPageComponent
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
    TrainingProgramConstructorModule,
    DragDropModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    })
  ],
  providers: [
    AuthService,
    Globals,
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
