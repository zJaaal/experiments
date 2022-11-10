function number() {
  this.errors = [];

  this._schema = {
    max: undefined,
    min: undefined,
    required: false,
    validate: undefined,
  };

  this.execute = function (value) {
    if (typeof value != "number") this.errors.push(`${value} is not a number`);

    if (
      (this._schema.required && typeof value == "undefined") ||
      typeof value == "null"
    )
      this.errors.push("Field is required");

    if (typeof this._schema.max != "undefined" && value > this._schema.max) {
      this.errors.push(`${value} is bigger than ${this._schema.max}`);
    }

    if (typeof this._schema.min != "undefined" && value < this._schema.min) {
      this.errors.push(`${value} is less than ${this._schema.min}`);
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

number.prototype.max = function (int) {
  if (typeof int != "number") throw new Error(`${int} is not a valid number`);

  this._schema.max = int;

  return this;
};

number.prototype.min = function (int) {
  if (typeof int != "number") throw new Error(`${int} is not a valid number`);

  this._schema.min = int;

  return this;
};

number.prototype.required = function () {
  this._schema.required = true;

  return this;
};

number.prototype.validate = function (callback) {
  if (typeof callback != "function")
    throw new Error(`${callback} is not a function`);
  this._schema.validate = callback;

  return this;
};

export default number;
