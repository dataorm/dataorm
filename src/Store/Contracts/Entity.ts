import { Model } from '../../Model/Model';

export interface Entity {
  name: string;
  model: typeof Model;
}
