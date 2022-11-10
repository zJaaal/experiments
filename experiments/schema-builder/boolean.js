function boolean() {
  this.errors = [];

  this._schema = {
    required: false,
  };

  this.execute = function (value) {
    if (typeof value != "boolean")
      this.errors.push(`${value} is not a boolean`);

    if (
      (this._schema.required && typeof value == "undefined") ||
      typeof value == "null"
    )
      this.errors.push("Field is required");

    return this.errors.length ? this.errors : value;
  };

  return this;
}

boolean.prototype.required = function () {
  this._schema.required = true;

  return this;
};

export default boolean;
