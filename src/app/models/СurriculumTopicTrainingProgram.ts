export class CurriculumTopicTrainingProgram {
  constructor(
    public id?: number,
    public isVariable?: boolean,
    public classHours?: number,
    public serialNumber?: number,
    public curriculumTopicId?: number,
    public trainingProgramId?: number,
    public trainingProgrmaCurriculumSectionId?: number,
    public topicTitle?: string,
    public testWork?: string,
    public annotation?: string,
    public shortName?: string,
    public fullName?: string,
    public occupationFormId?: number){ }
}
