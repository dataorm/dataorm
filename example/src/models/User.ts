import { Model } from 'dataorm';

class User extends Model {
  public static entity = 'users';

  public static primaryKey = 'id';

  public static fields() {
    return {
      id: this.attributes.uuid(),
      name: this.attributes.string(),
      email: this.attributes.string(),
    };
  }

  public static posts() {
    return this.relations.hasMany('Post');
  }
}

export { User };
