function string() {
  this.errors = [];

  this._schema = {
    max: undefined,
    min: undefined,
    required: false,
    regex: undefined,
    validate: undefined,
  };

  this.execute = function (value) {
    if (typeof value != "string") this.errors.push(`${value} is not a string`);

    if (
      typeof this._schema.max != "undefined" &&
      typeof this._schema.min != "undefined" &&
      this._schema.max < this._schema.min
    )
      throw new Error(
        `max value: ${this._schema.max} is less than min value: ${this._schema.min}`
      );

    if (
      (this._schema.required && typeof value == "undefined") ||
      typeof value == "null"
    )
      this.errors.push("Field is required");

    if (
      typeof this._schema.max != "undefined" &&
      value.length > this._schema.max
    ) {
      this.errors.push(`${value} has more than ${this._schema.max} chars`);
    }

    if (
      typeof this._schema.min != "undefined" &&
      value.length < this._schema.min
    ) {
      this.errors.push(`${value} has less than ${this._schema.min} chars`);
    }

    if (
      typeof this._schema.regex != "undefined" &&
      !this._schema.regex.test(value)
    ) {
      this.errors.push(
        `${value} doesn't match the expression ${this._schema.regex}`
      );
    }

    if (
      typeof this._schema.validate != "undefined" &&
      !this._schema.validate(value)
    ) {
      this.errors.push(`${value} is invalid`);
    }

    return this.errors.length ? this.errors : value;
  };

  return this;
}

string.prototype.max = function (int) {
  if (typeof int != "number") throw new Error(`${int} is not a valid number`);

  this._schema.max = int;

  return this;
};

string.prototype.min = function (int) {
  if (typeof int != "number") throw new Error(`${int} is not a valid number`);

  this._schema.min = int;

  return this;
};

string.prototype.required = function () {
  this._schema.required = true;

  return this;
};

string.prototype.regex = function (regex) {
  this._schema.regex = regex;

  return this;
};

string.prototype.validate = function (callback) {
  if (typeof callback != "function")
    throw new Error(`${callback} is not a function`);
  this._schema.validate = callback;

  return this;
};

export default string;
