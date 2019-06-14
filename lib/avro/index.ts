import { isObjectType, isArrayType } from "../util";

const typeMap: any = {
  record: 'object',
  numeric: "numeric",
  integer: "numeric",
  float: "numeric",
  long: "numeric",
  double: "numeric",
};

const numericTypeMap: any = {
  integer: "integer",
  float: "float",
  double: "double",
  long: "long"
};

const typeOf = (type: string, isList?: boolean): string => {
  return isList ? "array" : (typeMap[type] || type);
};

const numericTypeOf = (type: string): string => {
  return numericTypeMap[type];
};

const convertFields = (fields: any) => {
  const keys = Object.keys(fields);
  return keys.reduce((acc: any, key: string) => {
    const fieldObject: any = fields[key];
    const { type, name } = fieldObject;
    const $type = typeOf(type)
    const value = {
      type: $type,
      name
    }
    acc[key] = value
    return acc;
  }, {});

}

export const convert = (schema: any = {}) => {
  const { types } = schema;
  if (!isObjectType(types)) {
    throw "Schema must have a types property that is an Object";
  }

  const keys = Object.keys(types);
  return keys.reduce((acc: any, key: string) => {
    const typeObject: any = types[key];
    const { type, fields } = typeObject;

    const isList = isArrayType(type);
    const isNullable = type === "null";

    const $type = typeOf(type, isList);

    const value: any = {
      name: key,
      type: $type,
      fields: convertFields(fields)
    };

    const numericType = numericTypeOf(type);
    if (isList) {
      const itemTypes = type;
      value.items = [];

      itemTypes.reduce((acc: any[], type: string) => {
        acc.push({
          type
        });
        return acc;
      }, value.items);
    }

    if (isNullable) {
      value.nullable = true;
    }
    if (numericType) {
      value.numericType = numericType;
    }

    acc[key] = value
    return acc;
  }, {});
};
