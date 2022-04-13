export class Teacher {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public patronymicName?: string,
    public position?: string,
    public academicRank?: string,
    public isCathedral?: boolean,
    public fullNameForm?: string){ }

  public static getName(t: any): string {
    return `${t.lastName} ${t.firstName[0]}.${t.patronymicName[0]}.`;
  }
  public static getFullName(t: any): string {
    return `${t.lastName} ${t.firstName} ${t.patronymicName}`;
  }
  // teacher.lastName + ' ' + teacher.firstName + ' ' +
  // teacher.patronymicName + ' (' + teacher.position + ')
  public static getFullNameWithPosition(t: any): string {
    return `${t.lastName} ${t.firstName} ${t.patronymicName} (${t.position})`;
  }
}
