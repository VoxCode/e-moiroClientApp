import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {GroupAddComponent} from './group/group-add.component';
import {DocxGeneratorATPComponent} from './docx-generator-ATP/docx-generator-ATP.component';
import {CertificationTypeComponent} from './certification-type/certification-type.component';
import {FinalExaminationComponent} from './final-examination/final-examination.component';
import {TestWorkComponent} from './test-work/test-work.component';
import {TestWorkEditComponent} from './test-work/test-work-edit.component';
import {TrainingProgramMainStepComponent
} from './training-program-constructor/training-program-main-step/training-program-main-step.component';
import {FinalExaminationEditComponent} from './final-examination/final-examination-edit.component';
import {CertificationTypeEditComponent} from './certification-type/certification-type-edit.component';
import {TrainingProgramEditComponent} from './training-program/training-program-edit.component';
import {RegulationComponent} from './regulation/regulation.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CurriculumSectionChildComponent
} from './training-program-constructor/training-program-main-step/curriculum-section-child/curriculum-section-child.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import {CommonService} from './common-service/common-service.component';
import {DocumentEditorAllModule, DocumentEditorContainerModule} from '@syncfusion/ej2-angular-documenteditor';
import {DocumentEdComponent} from './document-editor/document-ed/document-ed.component';
import {TrainingProgramCertificationStepComponent
} from './training-program-constructor/training-program-certification-step/training-program-certification-step.component';
import {TrainingProgramStepperComponent
} from './training-program-constructor/training-program-stepper/training-program-stepper.component';
import {TrainingProgramMainLiteratureStepComponent
} from './training-program-constructor/training-program-main-literature-step/training-program-main-literature-step.component';
import {TrainingProgramAdditionalLiteratureStepComponent
} from './training-program-constructor/training-program-additional-literature-step/training-program-additional-literature-step.component';
import {TrainingProgramRegulationStepComponent
} from './training-program-constructor/training-program-regulation-step/training-program-regulation-step.component';
import {DocxGeneratorTPComponent} from './docx-generator-TP/docx-generator-TP.component';
import { FilterPipe } from './filter.pipe';
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
import { RichTextEditorFormComponent } from './rich-text-editor-form/rich-text-editor-form.component';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import {TrainingProgramIntroductionStepComponent
} from './training-program-constructor/training-program-introduction-step/training-program-introduction-step.component';
import { DocumentEditorFormComponent } from './document-editor/document-editor-form/document-editor-form.component';
import { TeacherDepartmentAddFormComponent } from './teacher/teacher-department-add-form/teacher-department-add-form.component';
import { ExpertComponent } from './expert/expert.component';
import {ExpertEditComponent} from './expert/expert-edit.component';
import { TrainingProgramExpertStepComponent
} from './training-program-constructor/training-program-expert-step/training-program-expert-step.component';
import {TrainingProgramRegulationEditComponent} from './training-program-constructor/training-program-regulation-step/training-program-regulation-edit.component';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

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
    TrainingProgramComponent,
    TrainingProgramEditComponent,
    RegulationComponent,
    RegulationEditComponent,
    CurriculumTopicListComponent,
    CurriculumTopicAddFormComponent,
    DocxGeneratorATPComponent,
    DocxGeneratorTPComponent,
    CertificationTypeComponent,
    CertificationTypeEditComponent,
    FinalExaminationEditComponent,
    FinalExaminationComponent,
    TestWorkComponent,
    TestWorkEditComponent,
    TrainingProgramMainStepComponent,
    CurriculumSectionChildComponent,
    DocumentEdComponent,
    TrainingProgramCertificationStepComponent,
    TrainingProgramStepperComponent,
    TrainingProgramMainLiteratureStepComponent,
    TrainingProgramAdditionalLiteratureStepComponent,
    TrainingProgramRegulationStepComponent,
    TrainingProgramRegulationEditComponent,
    FilterPipe,
    AdminAreaComponent,
    CreatorAreaComponent,
    EditorAreaComponent,
    DeanAreaComponent,
    ViewerAreaComponent,
    UserComponent,
    UserEditComponent,
    AuthorizationComponent,
    RichTextEditorFormComponent,
    TrainingProgramIntroductionStepComponent,
    DocumentEditorFormComponent,
    TeacherDepartmentAddFormComponent,
    ExpertComponent,
    ExpertEditComponent,
    TrainingProgramExpertStepComponent
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
    RichTextEditorAllModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
