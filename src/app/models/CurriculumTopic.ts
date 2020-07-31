export class CurriculumTopic {
  constructor(
    public id?: number,
    public topicTitle?: string,
    public classHours?: number,
    public annotation?: string,
    public isDistanceLearning?: boolean,
   // public sectionNumber?: string,
    public curriculumSectionId?: number,
   // public curriculumSection?: string,
    public occupationFormId?: number,
   // public occupationForm?: string
  ){ }
}
