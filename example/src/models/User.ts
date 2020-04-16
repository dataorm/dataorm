import { Model } from 'dataorm';
import { Post } from './Post';

class User extends Model {
  public static entity = 'users';

  public static primaryKey = 'id';

  public static fields() {
    return {
      name: this.string(),
      email: this.string(),
    };
  }

  public static relations() {
    return {
      posts: this.hasMany(Post, 'user_id', 'post_id'),
    };
  }
}

export { User };
