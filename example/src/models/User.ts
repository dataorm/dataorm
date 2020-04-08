import { Model } from 'dataorm';

class User extends Model {
  public static entity = 'users';

  public static fields() {
    return {
      id: this.attributes.increment(),
      name: this.attributes.string(),
      title: this.attributes.string(),
      posts: this.relations.hasMany('Post', 'test'),
    };
  }
}

export { User };
