export class Role {
  constructor(
    public id?: string,
    public name?: string,
    public normalizedName?: string,
    public concurrencyStamp?: string) { }
}
