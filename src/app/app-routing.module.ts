import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditorGuardService } from './services/security/guards/editor-guard.service';
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
import {ViewerGuardService} from './services/security/guards/viewer-guard.service';
import {AdminGuardService} from './services/security/guards/admin-guard.service';
import {CreatorGuardService} from './services/security/guards/creator-guard.service';
import {DeanGuardService} from './services/security/guards/dean-guard.service';

const routes: Routes = [
  { path: 'docxGeneratorTP/:id', component:  DocxGeneratorTPComponent, canActivate: [CreatorGuardService, AdminGuardService]},
  { path: 'docxGeneratorATP/:id', component:  DocxGeneratorATPComponent, canActivate: [CreatorGuardService, AdminGuardService]},
  { path: 'additionalLiterature', component: AdditionalLiteratureComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'regulation', component: RegulationComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'curriculumSection', component: CurriculumSectionComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'curriculumTopic', component: CurriculumTopicComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'certificationType', component: CertificationTypeComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'department', component: DepartmentComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'formOfEducation', component: FormOfEducationComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'group', component: GroupComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'groupAdd', component: GroupAddComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'mainLiterature', component: MainLiteratureComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'occupationForm', component: OccupationFormComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'teacher', component: TeacherComponent, canActivate: [DeanGuardService, AdminGuardService]},
  { path: 'studentCategory', component: StudentCategoryComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'trainingProgram', component: TrainingProgramComponent, canActivate: [ViewerGuardService, EditorGuardService, AdminGuardService]},
  { path: 'trainingProgramAddForm/:id', component: TrainingProgramAddFormComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'testWork', component: TestWorkComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'curriculumTopicAddForm/:id', component: CurriculumTopicAddFormComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'trainingProgramAddForm2/:id', component: TrainingProgramAddForm2Component, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'trainingProgramAddForm3/:id', component: TrainingProgramAddForm3Component, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'trainingProgramAddForm4/:id', component: TrainingProgramAddForm4Component, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'trainingProgramAddForm5/:id', component: TrainingProgramAddForm5Component, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'finalExamination', component: FinalExaminationComponent, canActivate: [EditorGuardService, AdminGuardService]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'trainingProgram'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
