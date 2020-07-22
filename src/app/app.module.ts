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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    HomeComponent,
    AdditionalLiteratureComponent,
    CurriculumSectionComponent,
    CurriculumTopicComponent,
    DepartmentComponent,
    FormOfEducationComponent,
    GroupComponent,
    MainLiteratureComponent,
    OccupationFormComponent,
    SectionNumberComponent,
    TeacherComponent,
    TeacherCategoryComponent,
    TeachingPositionComponent,
    TrainingProgramComponent,
    ConsultationTopicComponent,
    TheQuestionComponent,
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
