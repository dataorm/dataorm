import { Model } from 'dataorm';
import { User } from './User';
import { RoleUser } from './RoleUser';

class Role extends Model {
  public static entity = 'roles';

  public static primaryKey = 'id';

  public static fields() {
    return {
      id: this.increment(),
      name: this.string(),
    };
  }

  public static relations() {
    return {
      users: this.belongsToMany(User, RoleUser, 'role_id', 'user_id'),
    };
  }
}

export { Role };
