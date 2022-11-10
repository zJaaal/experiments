function object(schema) {
  if (typeof schema != "object") throw new Error(`${schema} is not an object`);

  this._schema = { ...schema };

  this.execute = function (value) {
    if (typeof value != "object") throw new Error(`${value} is not an object`);

    let errorsObject = { isValid: true };

    Object.keys(this._schema).forEach((key) => {
      let result = this._schema[key].execute(value[key]);

      console.log(result);

      if (
        Array.isArray(result) ||
        (typeof result.isValid != "undefined" && !result.isValid)
      ) {
        errorsObject.isValid = false;
        errorsObject[key] = result;
      }
    });

    return errorsObject.isValid ? value : errorsObject;
  };

  return this;
}

export default object;
