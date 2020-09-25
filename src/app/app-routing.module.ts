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
import {SectionNumberComponent} from './section-number/section-number.component';
import {TeacherComponent} from './teacher/teacher.component';
import {StudentCategoryComponent} from './student-category/student-category.component';
import {TeachingPositionComponent} from './teaching-position/teaching-position.component';
import {TrainingProgramComponent} from './training-program/training-program.component';
import {MainLiteratureComponent} from './main-literature/main-literature.component';
import {FormOfEducationComponent} from './form-of-education/form-of-education.component';
import {CurriculumTopicAddFormComponent} from './curriculum-topic-add-form/curriculum-topic-add-form.component';
import {GroupAddComponent} from './group/group-add.component';
import {DocxGeneratorComponent} from './docx-generator/docx-generator.component';

const routes: Routes = [
  { path: 'docxGenerator', component:  DocxGeneratorComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'additionalLiterature', component: AdditionalLiteratureComponent, canActivate: [AuthGuardService]},
  { path: 'regulation', component: RegulationComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumSection', component: CurriculumSectionComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumTopic', component: CurriculumTopicComponent, canActivate: [AuthGuardService]},
  { path: 'department', component: DepartmentComponent, canActivate: [AuthGuardService]},
  { path: 'formOfEducation', component: FormOfEducationComponent, canActivate: [AuthGuardService]},
  { path: 'group', component: GroupComponent, canActivate: [AuthGuardService]},
  { path: 'groupAdd', component: GroupAddComponent, canActivate: [AuthGuardService]},
  { path: 'mainLiterature', component: MainLiteratureComponent, canActivate: [AuthGuardService]},
  { path: 'occupationForm', component: OccupationFormComponent, canActivate: [AuthGuardService]},
  { path: 'sectionNumber', component: SectionNumberComponent, canActivate: [AuthGuardService]},
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuardService]},
  { path: 'teacherCategory', component: StudentCategoryComponent, canActivate: [AuthGuardService]},
  { path: 'teachingPosition', component: TeachingPositionComponent, canActivate: [AuthGuardService]},
  { path: 'trainingProgram', component: TrainingProgramComponent, canActivate: [AuthGuardService]},
  { path: 'curriculumTopicAddForm/:id', component: CurriculumTopicAddFormComponent, canActivate: [AuthGuardService]},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
