# Schema converter

[![Greenkeeper badge](https://badges.greenkeeper.io/kristianmandrup/schema-converter.svg)](https://greenkeeper.io/)

Library to convert a schema to a canonical schema. Can be used with [schema-traverser](https://github.com/kristianmandrup/schema-traverser)

- [JSON Schema](https://json-schema.org/)
- [GraphQL schema](https://graphql.org/learn/schema/) using [graphSchemaToJson](https://github.com/jjwtay/graphSchemaToJson)
- [Avro](https://avro.apache.org/docs/current/spec.html)
- [XML Schema Definition XSD](w3schools.com/xml/schema_intro.asp) using [xsd2json](https://github.com/fnogatz/xsd2json)

Infer a JSON schema from JSON data:

- [jsonschema.net](https://www.jsonschema.net/) online or [json-schema](https://github.com/jackwootton/json-schema) library directly

Infer a GraphQL schema from JSON data:

- [graphql-schema-from-json](https://github.com/marmelab/graphql-schema-from-json)
- [json-to-graphql](https://github.com/Aweary/json-to-graphql)

GraphQL server from JSON

- [json-graphql-server](https://github.com/marmelab/json-graphql-server)

### Canonical format

The canonical format will be based on Avro schema, enriched with attributes common to JSON schema. GraphQL schema is a small subset of JSON schema but with the same types (known from most programming languages) as Avro. XSD can be directly converted to JSON schema.

```json
{
  "version": "1.0",
  "$schema": "http://json-schema.org/schema#",
  "$id": "http://yourdomain.com/schemas/myschema.json",
  "type": "schema",
  "title": "Order schema",
  "description": "...",
  "types": {
    "LongList": {
      "type": "record",
      "name": "LongList",
      "aliases": ["LinkedLongs"], // old name for this
      "fields": [
        { "name": "value", "type": "long", "min": 0, "max": 4500 }, // each element has a long
        { "name": "next", "type": ["null", "#LongList"] } // optional next element
      ]
    }
  }
```

### JSON Schema

```json
// TODO
```

### GraphQL Schema as JSON

```json
// TODO
```

### Avro

```json
{
  "type": "record",
  "name": "LongList",
  "aliases": ["LinkedLongs"], // old name for this
  "fields": [
    { "name": "value", "type": "long" }, // each element has a long
    { "name": "next", "type": ["null", "LongList"] } // optional next element
  ]
}
```

### XSD

```json
// TODO
```

## Template

[Writing a Node.js module in TypeScript](https://www.twilio.com/blog/2017/06/writing-a-node-module-in-typescript.html)

## Resources

A similar project

[json-schema-traverse](https://github.com/epoberezkin/json-schema-traverse)

## License

MIT
