import { Model, Attr } from 'dataorm';

class User extends Model {
  static entity = 'users';

  static fields = {
    id: Attr.id({ autoincrement: true }),
    name: Attr.string({ nullable: false }),
  };
}

export { User };
