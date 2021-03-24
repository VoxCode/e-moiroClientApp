export class RoleChangeModel {
  constructor(
    public id?: string,
    public userName?: string,
    public email?: string,
    public oldRole?: string,
    public newRole?: string) { }
}
