import { Model } from 'dataorm';
import { User } from './User';

class Post extends Model {
  public static entity = 'posts';

  public static primaryKey = 'id';

  public static fields() {
    return {
      name: this.string(),
      email: this.string(),
    };
  }

  public static relations() {
    return {
      user: this.belongsTo(User),
    };
  }
}

export { Post };
