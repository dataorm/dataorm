import { Model } from 'dataorm';
import { User } from './User';

class Post extends Model {
  public static entity = 'posts';

  public static primaryKey = 'id';

  public static fields() {
    return {
      id: this.increment(),
      title: this.string(),
    };
  }

  public static relations() {
    return {
      user: this.belongsTo(User, 'post_id', 'user_id'),
    };
  }
}

export { Post };
