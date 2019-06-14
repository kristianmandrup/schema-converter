import { isObjectType } from "../util";
import { convertDirectives } from "./directive";

const typeMap: any = {
  Int: "numeric",
  Float: "numeric",
  String: "string",
  Boolean: "boolean"
};

const numericTypeMap: any = {
  Int: "integer",
  Float: "float"
};

const typeOf = (type: string, isList?: boolean): string => {
  return isList ? "array" : typeMap[type];
};

const numericTypeOf = (type: string): string => {
  return numericTypeMap[type];
};

export const convert = (schema: any = {}) => {
  const { types } = schema;
  if (!isObjectType(types)) {
    throw "Schema must have a types property that is an Object";
  }

  const keys = Object.keys(types);
  return keys.reduce((acc: any, key: string) => {
    const original: any = types[key];
    const { type, format, isList, isNullable, directives } = original;

    const $type = typeOf(type, isList);
    const validations = convertDirectives(directives);
    const value: any = {
      name: key,
      type: $type,
      ...validations
    };

    const numericType = numericTypeOf(format) || numericTypeOf(type);

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

    acc[key] = value;
    return acc;
  }, {});
};
