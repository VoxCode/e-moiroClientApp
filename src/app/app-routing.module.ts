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
import {TeachingPositionComponent} from './teaching-position/teaching-position.component';
import {TrainingProgramComponent} from './training-program/training-program.component';
import {MainLiteratureComponent} from './main-literature/main-literature.component';
import {FormOfEducationComponent} from './form-of-education/form-of-education.component';
import {CurriculumTopicAddFormComponent} from './curriculum-topic-add-form/curriculum-topic-add-form.component';
import {GroupAddComponent} from './group/group-add.component';
import {DocxGeneratorComponent} from './docx-generator/docx-generator.component';
import {TestWorkComponent} from './test-work/test-work.component';
import {CertificationTypeComponent} from './certification-type/certification-type.component';
import {FinalExaminationComponent} from './final-examination/final-examination.component';
import {TrainingProgramAddFormComponent} from './training-program-add-form/training-program-add-form.component';
import {TrainingProgramAddForm2Component} from './training-program-add-form2/training-program-add-form2.component';

const routes: Routes = [
  { path: 'docxGenerator/:id', component:  DocxGeneratorComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'additionalLiterature', component: AdditionalLiteratureComponent, canActivate: [AuthGuardService]},
  { path: 'regulation', component: RegulationComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumSection', component: CurriculumSectionComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumTopic', component: CurriculumTopicComponent, canActivate: [AuthGuardService]},
  { path: 'certificationType', component: CertificationTypeComponent, canActivate: [AuthGuardService]},
  { path: 'department', component: DepartmentComponent, canActivate: [AuthGuardService]},
  { path: 'formOfEducation', component: FormOfEducationComponent, canActivate: [AuthGuardService]},
  { path: 'group', component: GroupComponent, canActivate: [AuthGuardService]},
  { path: 'groupAdd', component: GroupAddComponent, canActivate: [AuthGuardService]},
  { path: 'mainLiterature', component: MainLiteratureComponent, canActivate: [AuthGuardService]},
  { path: 'occupationForm', component: OccupationFormComponent, canActivate: [AuthGuardService]},
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuardService]},
  { path: 'studentCategory', component: StudentCategoryComponent, canActivate: [AuthGuardService]},
  { path: 'teachingPosition', component: TeachingPositionComponent, canActivate: [AuthGuardService]},
  { path: 'trainingProgram', component: TrainingProgramComponent, canActivate: [AuthGuardService]},
  { path: 'trainingProgramAddForm/:id', component: TrainingProgramAddFormComponent, canActivate: [AuthGuardService]},
  { path: 'testWork', component: TestWorkComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumTopicAddForm/:id', component: CurriculumTopicAddFormComponent, canActivate: [AuthGuardService]},
  { path: 'trainingProgramAddForm2/:id', component: TrainingProgramAddForm2Component, canActivate: [AuthGuardService]},
  { path: 'finalExamination', component: FinalExaminationComponent, canActivate: [AuthGuardService]},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
