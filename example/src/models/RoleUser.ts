import { Model } from 'dataorm';
import { User } from './User';

class RoleUser extends Model {
  public static entity = 'role_user';

  public static primaryKey = ['role_id', 'user_id'];

  public static fields() {
    return {
      id: this.increment(),
      role_id: this.number(),
      user_id: this.number(),
    };
  }
}

export { RoleUser };
