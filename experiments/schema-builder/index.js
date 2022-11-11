import string from "./string.js";
import number from "./number.js";
import boolean from "./boolean.js";
import object from "./object.js";

const schemaBuilder = {
  string: () => new string(),
  number: () => new number(),
  boolean: () => new boolean(),
  object: (schema) => new object(schema),
};

export default schemaBuilder;
