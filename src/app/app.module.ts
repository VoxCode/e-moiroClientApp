import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdditionalLiteratureComponent } from './additional-literature/additional-literature.component';
import { CurriculumSectionComponent } from './curriculum-section/curriculum-section.component';
import { CurriculumTopicComponent } from './curriculum-topic/curriculum-topic.component';
import { DepartmentComponent } from './department/department.component';
import { FormOfEducationComponent } from './form-of-education/form-of-education.component';
import { GroupComponent } from './group/group.component';
import { MainLiteratureComponent } from './main-literature/main-literature.component';
import { OccupationFormComponent } from './occupation-form/occupation-form.component';
import { SectionNumberComponent } from './section-number/section-number.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherCategoryComponent } from './teacher-category/teacher-category.component';
import { TeachingPositionComponent } from './teaching-position/teaching-position.component';
import { TrainingProgramComponent } from './training-program/training-program.component';
import { ConsultationTopicComponent } from './consultation-topic/consultation-topic.component';
import { TheQuestionComponent } from './the-question/the-question.component';
import { CurriculumTopicListComponent } from './curriculum-topic-list/curriculum-topic-list.component';
import {InputsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {AdditionalLiteratureEditComponent} from './additional-literature/additional-literature-edit.component';
import {MainLiteratureEditComponent} from './main-literature/main-literature-edit.component';
import {ConsultationTopicEditComponent} from './consultation-topic/consultation-topic-edit.component';
import {DepartmentEditComponent} from './department/department-edit.component';
import {FormOfEducationEditComponent} from './form-of-education/form-of-education-edit.component';
import {TeachingPositionEditComponent} from './teaching-position/teaching-position-edit.component';
import {SectionNumberEditComponent} from './section-number/section-number-edit.component';
import {TheQuestionEditComponent} from './the-question/the-question-edit.component';
import {TeacherEditComponent} from './teacher/teacher-edit.component';
import {CurriculumSectionEditComponent} from './curriculum-section/curriculum-section-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    HomeComponent,
    AdditionalLiteratureComponent,
    AdditionalLiteratureEditComponent,
    CurriculumSectionComponent,
    CurriculumSectionEditComponent,
    CurriculumTopicComponent,
    DepartmentComponent,
    DepartmentEditComponent,
    FormOfEducationComponent,
    FormOfEducationEditComponent,
    GroupComponent,
    MainLiteratureComponent,
    MainLiteratureEditComponent,
    OccupationFormComponent,
    SectionNumberComponent,
    SectionNumberEditComponent,
    TeacherComponent,
    TeacherEditComponent,
    TeacherCategoryComponent,
    TeachingPositionComponent,
    TeachingPositionEditComponent,
    TrainingProgramComponent,
    ConsultationTopicComponent,
    ConsultationTopicEditComponent,
    TheQuestionComponent,
    TheQuestionEditComponent,
    CurriculumTopicListComponent
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
    FormsModule
  ],
  providers: [
    AuthService,
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
