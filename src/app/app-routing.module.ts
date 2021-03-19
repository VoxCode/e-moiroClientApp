import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import {AdditionalLiteratureComponent} from './additional-literature/additional-literature.component';
import {RegulationComponent} from './regulation/regulation.component';
import {CurriculumSectionComponent} from './curriculum-section/curriculum-section.component';
import {CurriculumTopicComponent} from './curriculum-topic/curriculum-topic.component';
import {DepartmentComponent} from './department/department.component';
import {GroupComponent} from './group/group.component';
import {OccupationFormComponent} from './occupation-form/occupation-form.component';
import {TeacherComponent} from './teacher/teacher.component';
import {StudentCategoryComponent} from './student-category/student-category.component';
import {TrainingProgramComponent} from './training-program/training-program.component';
import {MainLiteratureComponent} from './main-literature/main-literature.component';
import {FormOfEducationComponent} from './form-of-education/form-of-education.component';
import {CurriculumTopicAddFormComponent} from './curriculum-topic-add-form/curriculum-topic-add-form.component';
import {GroupAddComponent} from './group/group-add.component';
import {DocxGeneratorATPComponent} from './docx-generator-ATP/docx-generator-ATP.component';
import {TestWorkComponent} from './test-work/test-work.component';
import {CertificationTypeComponent} from './certification-type/certification-type.component';
import {FinalExaminationComponent} from './final-examination/final-examination.component';
import {TrainingProgramAddFormComponent} from './training-program-add-form/training-program-add-form.component';
import {TrainingProgramAddForm2Component} from './training-program-add-form2/training-program-add-form2.component';
import {TrainingProgramAddForm3Component} from './training-program-add-form3/training-program-add-form3.component';
import {TrainingProgramAddForm4Component} from './training-program-add-form4/training-program-add-form4.component';
import {TrainingProgramAddForm5Component} from './training-program-add-form5/training-program-add-form5.component';
import {DocxGeneratorTPComponent} from './docx-generator-TP/docx-generator-TP.component';
import {ViewerGuard} from './services/viewer-guard';
import {AdminGuard} from './services/admin-guard';

const routes: Routes = [
  { path: 'docxGeneratorTP/:id', component:  DocxGeneratorTPComponent, canActivate: [AuthGuardService]},
  { path: 'docxGeneratorATP/:id', component:  DocxGeneratorATPComponent, canActivate: [AuthGuardService]},
  { path: 'additionalLiterature', component: AdditionalLiteratureComponent, canActivate: [AuthGuardService, AdminGuard]},
  { path: 'regulation', component: RegulationComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumSection', component: CurriculumSectionComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumTopic', component: CurriculumTopicComponent, canActivate: [AuthGuardService]},
  { path: 'certificationType', component: CertificationTypeComponent, canActivate: [AuthGuardService]},
  { path: 'department', component: DepartmentComponent, canActivate: [AuthGuardService]},
  { path: 'formOfEducation', component: FormOfEducationComponent, canActivate: [AuthGuardService]},
  { path: 'group', component: GroupComponent, canActivate: [AuthGuardService]},
  { path: 'groupAdd', component: GroupAddComponent, canActivate: [AuthGuardService]},
  { path: 'mainLiterature', component: MainLiteratureComponent, canActivate: [AuthGuardService]},
  { path: 'occupationForm', component: OccupationFormComponent, canActivate: [AuthGuardService, ViewerGuard]},
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuardService]},
  { path: 'studentCategory', component: StudentCategoryComponent, canActivate: [AuthGuardService]},
  { path: 'trainingProgram', component: TrainingProgramComponent, canActivate: [AuthGuardService]},
  { path: 'trainingProgramAddForm/:id', component: TrainingProgramAddFormComponent, canActivate: [AuthGuardService]},
  { path: 'testWork', component: TestWorkComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumTopicAddForm/:id', component: CurriculumTopicAddFormComponent, canActivate: [AuthGuardService]},
  { path: 'trainingProgramAddForm2/:id', component: TrainingProgramAddForm2Component, canActivate: [AuthGuardService]},
  { path: 'trainingProgramAddForm3/:id', component: TrainingProgramAddForm3Component, canActivate: [AuthGuardService]},
  { path: 'trainingProgramAddForm4/:id', component: TrainingProgramAddForm4Component, canActivate: [AuthGuardService]},
  { path: 'trainingProgramAddForm5/:id', component: TrainingProgramAddForm5Component, canActivate: [AuthGuardService]},
  { path: 'finalExamination', component: FinalExaminationComponent, canActivate: [AuthGuardService]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'trainingProgram'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
