import { Model, Attr } from 'dataorm';

class User extends Model {
  public static entity = 'users';

  public static fields = {
    id: Attr.id({ autoincrement: true }),
    name: Attr.string({ nullable: false }),
  };
}

export { User };
