import { BelongsTo } from '../Relations/BelongsTo';
import { BelongsToMany } from '../Relations/BelongsToMany';
import { HasMany } from '../Relations/HasMany';
import { HasOne } from '../Relations/HasOne';

export class Relations {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  public hasMany(related: any, localKey = 'id') {
    return HasMany.make(related, this.model, localKey);
  }

  public belongsTo(related: any, localKey = 'id') {
    return BelongsTo.make(related, this.model, localKey);
  }

  public belongsToMany(related: any, localKey = 'id') {
    return BelongsToMany.make(related, this.model, localKey);
  }

  public hasOne(related: any, localKey = 'id') {
    return HasOne.make(related, this.model, localKey);
  }
}
