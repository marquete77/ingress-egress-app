export class UserModel {

  constructor(
    public uid: string | undefined,
    public name: string,
    public email: string | null | undefined,
  ) {
  }

}
