export class TotalClassHours {
  private classHours = 0;
  constructor(
    private tmpClassHours: number[]
  ) {
    this.tmpClassHours.forEach(num => {
      this.classHours += num;
    });
  }

  public get allClassHours(): number {

    return this.classHours;
  }
}
