import { Model } from 'dataorm';
import { Post } from './Post';
import { RoleUser } from './RoleUser';

class User extends Model {
  public static entity = 'users';

  public static primaryKey = 'id';

  public static fields() {
    return {
      id: this.increment(),
      name: this.string(),
    };
  }

  public static relations() {
    return {
      posts: this.hasMany(Post, 'user_id', 'post_id'),
      roles: this.belongsToMany(User, RoleUser, 'user_id', 'role_id'),
    };
  }
}

export { User };
