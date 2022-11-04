//Builder Pattern

console.clear();

// In a nutshell an Schema Builder as Joi or Yup. But a really small one and without some validations
// I made it to understand how it works on the inside, so I could probably use it in the future

//Would re make it on typescript and a Function/Class for every schema type
function SchemaBuilder() {
  this.errors = [];

  this._schema = {
    type: undefined,
    schema: undefined,
    max: undefined,
    min: undefined,
    required: false,
    regex: undefined,
    validate: undefined,
    constrains: [],
  };

  this.execute = (value, key) => {
    const { type, max, min, required, regex, validate, schema } = this._schema;

    if (required) {
      if (typeof value == "undefined")
        this.errors.push(`${key || "field"} is required`);
    } else if (typeof value == "undefined") {
      return value;
    }

    if (type == "object") {
      let objectErrors = {
        _notValid: false,
      };

      Object.keys(schema).forEach((key) => {
        if (
          typeof value[key] == "undefined" &&
          schema[key]._schema.constrains.includes("required")
        ) {
          objectErrors._notValid = true;

          objectErrors[key] = [];

          objectErrors[key].push(`${key} is undefined`);
        } else {
          let result = schema[key].execute(value[key], key);
          if (Array.isArray(result) || result._notValid) {
            objectErrors._notValid = true;

            objectErrors[key] = result;
          }
        }
      });

      return objectErrors._notValid ? objectErrors : value;
    } else {
      if (typeof value != type)
        this.errors.push(`${key || "field"} is not a ${type}`);

      if (type != "boolean") {
        if (
          (typeof min != "undefined" &&
            typeof value == "string" &&
            value.length < min) ||
          (typeof value == "number" && value < min)
        )
          this.errors.push(`${key || "field"} is less than ${min}`);

        if (
          (typeof max != "undefined" &&
            typeof value == "string" &&
            value.length > max) ||
          (typeof value == "number" && value > max)
        )
          this.errors.push(`${key || "field"} is more than ${max}`);

        if (typeof regex != "undefined" && !regex.test(value))
          this.errors.push(`${key || "field"} doesn't match ${regex}`);

        if (typeof validate != "undefined" && !validate(value))
          this.errors.push(`${key || "field"} failed to validate`);
      }
    }

    return this.errors.length ? this.errors : value;
  };
  return this;
}

SchemaBuilder.prototype.number = function () {
  this._schema.type = "number";

  return this;
};

SchemaBuilder.prototype.object = function (schema) {
  this._schema.type = "object";
  this._schema.schema = schema;

  return this;
};
SchemaBuilder.prototype.boolean = function () {
  this._schema.type = "boolean";
  return this;
};

SchemaBuilder.prototype.string = function () {
  this._schema.type = "string";
  return this;
};

SchemaBuilder.prototype.min = function (int) {
  if (typeof this._schema.type == "undefined")
    throw new Error("Please set a type first");

  this._schema.constrains.push("min");
  this._schema.min = int;
  return this;
};
SchemaBuilder.prototype.max = function (int) {
  if (typeof this._schema.type == "undefined")
    throw new Error("Please set a type first");

  this._schema.constrains.push("max");
  this._schema.max = int;
  return this;
};
SchemaBuilder.prototype.required = function () {
  if (typeof this._schema.type == "undefined")
    throw new Error("Please set a type first");

  this._schema.constrains.push("required");
  this._schema.required = true;

  return this;
};

SchemaBuilder.prototype.test = function (regex) {
  if (typeof this._schema.type == "undefined")
    throw new Error("Please set a type first");

  this._schema.constrains.push("regex");
  this._schema.regex = regex;
  return this;
};

SchemaBuilder.prototype.validate = function (callback) {
  if (typeof this._schema.type == "undefined")
    throw new Error("Please set a type first");

  this._schema.constrains.push("validate");
  this._schema.validate = callback;
  return this;
};

const JalSchema = new SchemaBuilder();

const jalValidator = JalSchema.object({
  name: new SchemaBuilder().string().min(3).max(8).required(),

  lastName: new SchemaBuilder().string().min(4).max(7).required(),

  age: new SchemaBuilder().number().min(18).max(21).required(),

  working: new SchemaBuilder().boolean().required(),

  address: new SchemaBuilder()
    .object({
      street: new SchemaBuilder().string().required(),
      floor: new SchemaBuilder().number().required(),
      zipCode: new SchemaBuilder().string().required(),
      country: new SchemaBuilder().string().required(),
    })
    .required(),
});

const Jal = {
  name: "Jalinson",
  lastName: "Diaz",
  age: 21,
  working: false,
  address: {
    street: "Some street",
    floor: 293120,
    zipCode: "Some Zip Code",
    country: "Argentina",
  },
};

console.log(jalValidator.execute(Jal));
