import string from "./string.js";
import number from "./number.js";
import boolean from "./boolean.js";
import object from "./object.js";

const handler = {
  apply: (target, thisArgs, args) => {
    return new target(...args);
  },
};

const stringProxy = new Proxy(string, handler);
const numberProxy = new Proxy(number, handler);
const booleanProxy = new Proxy(boolean, handler);
const objectProxy = new Proxy(object, handler);

const schemaBuilder = {
  string: stringProxy,
  number: numberProxy,
  boolean: booleanProxy,
  object: objectProxy,
};

export default schemaBuilder;
