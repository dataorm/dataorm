import { IdAttrType, IdAttrTypeData } from './IdAttr';
import { StringAttrType, StringAttrTypeData } from './StringAttr';

class Attr {
  static generate(data: any, IdAttrTypeData: any) {
    return { data, IdAttrTypeData };
  }

  static id(data: IdAttrType = IdAttrTypeData) {
    return this.generate(data, IdAttrTypeData);
  }

  static string(data: StringAttrType = StringAttrTypeData) {
    return this.generate(data, StringAttrTypeData);
  }
}

export { Attr };
