export class UserModel {

  static fronFirebase({email, name, uid}: any) {
    return new UserModel(uid, name, email);
  }

  constructor(
    public uid: string | undefined,
    public name: string,
    public email: string | null | undefined,
  ) {
  }

}
