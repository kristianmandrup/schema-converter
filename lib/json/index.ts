import { isObjectType } from "../util";
import { convertDirectives } from "./directive";

const typeMap: any = {
  int: "numeric",
  number: "numeric",
};

const numericTypeMap: any = {
  integer: "integer",
  float: "float"
};

const isObject = (type: string) => type === 'object'

const typeOf = (type: string, isList?: boolean): string => {
  return isList ? "array" : (typeMap[type] || type);
};

// TODO: use Number type calculator class from es-mapping library
const numericTypeOf = (type: string): string => {
  return numericTypeMap[type];
};

const propertyValueOf = ({type, $type, format}) => {
  const value: any = {
    name: key,
    type: $type
  };
  const isNullable = type === "null";  

  const numericType = numericTypeOf(format) || numericTypeOf(type);

  if (isNullable) {
    value.nullable = true;
  }
  if (numericType) {
    value.numericType = numericType;
  }
  return value
}


export const convert = (schema: any = {}) => {
  const { properties } = schema;
  if (!isObjectType(properties)) {
    throw "Schema must have a properties entry that is an Object";
  }

  const keys = Object.keys(properties);
  const fields = keys.reduce((acc: any, key: string) => {
    const property: any = properties[key];
    const { type, format } = property;

    const isList = isArrayType(type);
    const $type = typeOf(type, isList);

    acc[key] = isObject($type) ? convert(property) : propertyValueOf({type, $type, format});
    return acc;
  }, {});

  return {
    fields
  }
};
