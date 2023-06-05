import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrainingProgramIntroductionStepComponent} from './training-program-introduction-step/training-program-introduction-step.component';
import {DocumentEditorFormComponent} from '../document-editor/document-editor-form/document-editor-form.component';
import {TrainingProgramStepperComponent} from './training-program-stepper/training-program-stepper.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AppRoutingModule} from '../app-routing.module';
import {TrainingProgramRegulationStepComponent} from './training-program-regulation-step/training-program-regulation-step.component';
import {TrainingProgramMainLiteratureStepComponent} from './training-program-main-literature-step/training-program-main-literature-step.component';
import {TrainingProgramAdditionalLiteratureStepComponent} from './training-program-additional-literature-step/training-program-additional-literature-step.component';
import {TrainingProgramCertificationStepComponent} from './training-program-certification-step/training-program-certification-step.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TemplateOfferComponent} from './template-offer/template-offer.component';
import {TrainingProgramExpertStepComponent} from './training-program-expert-step/training-program-expert-step.component';
import {TrainingProgramMainStepComponent} from './training-program-main-step/training-program-main-step.component';
import {FilterPipe} from '../filter.pipe';
import {DocumentEditorAllModule, DocumentEditorContainerModule} from '@syncfusion/ej2-angular-documenteditor';
import {CurriculumSectionChildComponent} from './training-program-main-step/curriculum-section-child/curriculum-section-child.component';
import {MaxVariableTopicHoursComponent} from './training-program-main-step/max-variable-topic-hours/max-variable-topic-hours.component';
import {CurriculumTopicChildComponent} from './training-program-main-step/curriculum-topic-child/curriculum-topic-child.component';
import {OccupationFormClassHourChildComponent} from './training-program-main-step/occupation-form-class-hour-child/occupation-form-class-hour-child.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {OccupationFormClassTimeEditFormComponent} from './training-program-main-step/occupation-form-class-hour-child/occupation-form-class-time-edit-form.component';
import {TrainingProgramGuidedTestWorkStepComponent} from './training-program-guided-test-work-step/training-program-guided-test-work-step.component';
import {GuidedTestWorkTopicChildComponent} from './training-program-guided-test-work-step/guided-test-work-topic-child/guided-test-work-topic-child.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import { BusinessGameFormComponent } from './training-program-certification-step/business-game-form/business-game-form.component';
import { SyncfusionRichTextEditorComponent } from '../document-editor/rich-text-editor/syncfusion-rich-text-editor.component';
import {RichTextEditorModule} from '@syncfusion/ej2-angular-richtexteditor';
import { QuestionsFormComponent } from './training-program-certification-step/questions-form/questions-form.component';
import { BusinessGameBlockComponent } from './main-step-constructors/business-game-constructor/business-game-block/business-game-block.component';
import { BusinessGameConstructorComponent } from './main-step-constructors/business-game-constructor/business-game-constructor.component';
import { BusinessGameViewerComponent } from './main-step-constructors/business-game-constructor/business-game-viewer/business-game-viewer.component';
import { TrainingProgramMainStepCurriculumTypeFormComponent } from './training-program-main-step/training-program-main-step-curriculum-type-form/training-program-main-step-curriculum-type-form.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    DragDropModule,
    DocumentEditorContainerModule,
    DocumentEditorAllModule,
    NgSelectModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RichTextEditorModule,
  ],
  declarations: [
    TrainingProgramIntroductionStepComponent,
    DocumentEditorFormComponent,
    TrainingProgramStepperComponent,
    TrainingProgramRegulationStepComponent,
    TrainingProgramMainLiteratureStepComponent,
    TrainingProgramAdditionalLiteratureStepComponent,
    TrainingProgramCertificationStepComponent,
    TemplateOfferComponent,
    TrainingProgramExpertStepComponent,
    TrainingProgramMainStepComponent,
    FilterPipe,
    CurriculumSectionChildComponent,
    MaxVariableTopicHoursComponent,
    CurriculumTopicChildComponent,
    OccupationFormClassHourChildComponent,
    TrainingProgramGuidedTestWorkStepComponent,
    OccupationFormClassTimeEditFormComponent,
    GuidedTestWorkTopicChildComponent,
    BusinessGameFormComponent,
    SyncfusionRichTextEditorComponent,
    QuestionsFormComponent,
    BusinessGameBlockComponent,
    BusinessGameConstructorComponent,
    BusinessGameViewerComponent,
    TrainingProgramMainStepCurriculumTypeFormComponent
  ],
  exports: [],
  providers: []
})
export class TrainingProgramConstructorModule {

}
