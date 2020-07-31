export class CurriculumTopic {
  constructor(
    public id?: number,
    public topicTitle?: string,
    public classHours?: number,
    public annotation?: string,
    public isDistanceLearning?: boolean,
    public curriculumSectionId?: number,
    public curriculumSectionName?: string,
    public occupationFormId?: number,
    public occupationFormName?: string
  ){ }
}
