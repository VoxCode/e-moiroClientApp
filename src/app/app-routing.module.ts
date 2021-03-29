import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
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
import {AdminAreaComponent} from './admin-area/admin-area.component';
import {EditorAreaComponent} from './editor-area/editor-area.component';
import {CreatorAreaComponent} from './creator-area/creator-area.component';
import {DeanAreaComponent} from './dean-area/dean-area.component';
import {ViewerAreaComponent} from './viewer-area/viewer-area.component';
import {UserComponent} from './admin-area/users/user.component';
import {AuthorizationComponent} from './authorization/authorization.component';

const adminRoutes: Routes = [
  { path: 'docxGeneratorTP/:id', component:  DocxGeneratorTPComponent },
  { path: 'docxGeneratorATP/:id', component:  DocxGeneratorATPComponent },
  { path: 'additionalLiterature', component: AdditionalLiteratureComponent },
  { path: 'regulation', component: RegulationComponent },
  { path: 'curriculumSection', component: CurriculumSectionComponent },
  { path: 'curriculumTopic', component: CurriculumTopicComponent },
  { path: 'certificationType', component: CertificationTypeComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'formOfEducation', component: FormOfEducationComponent },
  { path: 'group', component: GroupComponent },
  { path: 'groupAdd', component: GroupAddComponent },
  { path: 'mainLiterature', component: MainLiteratureComponent },
  { path: 'occupationForm', component: OccupationFormComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'studentCategory', component: StudentCategoryComponent },
  { path: 'trainingProgram', component: TrainingProgramComponent },
  { path: 'trainingProgramAddForm/:id', component: TrainingProgramAddFormComponent },
  { path: 'testWork', component: TestWorkComponent },
  { path: 'curriculumTopicAddForm/:id', component: CurriculumTopicAddFormComponent },
  { path: 'trainingProgramAddForm2/:id', component: TrainingProgramAddForm2Component },
  { path: 'trainingProgramAddForm3/:id', component: TrainingProgramAddForm3Component },
  { path: 'trainingProgramAddForm4/:id', component: TrainingProgramAddForm4Component },
  { path: 'trainingProgramAddForm5/:id', component: TrainingProgramAddForm5Component },
  { path: 'finalExamination', component: FinalExaminationComponent },
  { path: 'user', component: UserComponent },
  { path: '**', redirectTo: 'trainingProgram'}
];

const editorRoutes: Routes = [

];

const creatorRoutes: Routes = [
  { path: 'curriculumTopicAddForm/:id', component: CurriculumTopicAddFormComponent },
  { path: 'trainingProgram', component: TrainingProgramComponent },
  { path: 'trainingProgramAddForm/:id', component: TrainingProgramAddFormComponent },
  { path: 'trainingProgramAddForm2/:id', component: TrainingProgramAddForm2Component },
  { path: 'trainingProgramAddForm3/:id', component: TrainingProgramAddForm3Component },
  { path: 'trainingProgramAddForm4/:id', component: TrainingProgramAddForm4Component },
  { path: 'trainingProgramAddForm5/:id', component: TrainingProgramAddForm5Component },
  { path: 'docxGeneratorTP/:id', component:  DocxGeneratorTPComponent },
  { path: 'docxGeneratorATP/:id', component:  DocxGeneratorATPComponent },
  { path: '**', redirectTo: 'trainingProgram'}
];

const deanRoutes: Routes = [

];

const viewerRoutes: Routes = [

];

const routes: Routes = [
  { path: 'admin', component:  AdminAreaComponent, children: adminRoutes, canActivate: [AdminGuardService]},
  { path: 'editor', component:  EditorAreaComponent, children: editorRoutes, canActivate: [EditorGuardService]},
  { path: 'creator', component:  CreatorAreaComponent, children: creatorRoutes, canActivate: [CreatorGuardService]},
  { path: 'dean', component:  DeanAreaComponent, children: deanRoutes, canActivate: [DeanGuardService]},
  { path: 'viewer', component:  ViewerAreaComponent, children: viewerRoutes, canActivate: [ViewerGuardService]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'authorization', component: AuthorizationComponent},
  { path: '**', redirectTo: 'authorization'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
