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

  public static relations() {
    return {
      users: this.belongsToMany(User, RoleUser, 'role_id', 'post_id'),
    };
  }
}

export { RoleUser };
