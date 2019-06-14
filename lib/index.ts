export const convert = (opts: any = {}): any => {
  const { schema } = opts;
  if (!schema) {
    throw "Missing schema";
  }

  const type = detectSchemaType(schema);
  const result = schema;

  return result;
};

const detectSchemaType = (schema: any) => {
  const { properties } = schema;

  if (properties) return "json";
  return "graphql";
};
