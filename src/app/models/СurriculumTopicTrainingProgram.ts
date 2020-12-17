export class CurriculumTopicTrainingProgram {
  constructor(
    public id?: number,
    public isVariable?: boolean,
    public classHours?: number,
    public serialNumber?: number,
    public curriculumTopicId?: number,
    public trainingProgramId?: number,
    public curriculumSectionId?: number,
    public topicTitle?: string,
    public testWork?: string,
    public annotation?: string,
    public occupationFormId?: number){ }
}
