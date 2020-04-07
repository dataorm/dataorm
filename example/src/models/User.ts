import { Model } from 'dataorm';

class User extends Model {
  public static entity = 'users';

  public static fields() {
    return {
      id: this.attr.increment(),
      name: this.attr.string(),
      posts: this.relations.hasMany('Post', 'test'),
    };
  }
}

export { User };
