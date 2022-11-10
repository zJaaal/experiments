function object(schema) {
  if (typeof schema != "object") throw new Error(`${schema} is not an object`);

  this._schema = { ...schema };

  this.execute = function (value) {
    if (typeof value != "object") throw new Error(`${value} is not an object`);

    let errorsObject = { _notValid: false };

    Object.keys(this._schema).forEach((key) => {
      let result = this._schema[key].execute(value[key]);

      if (Array.isArray(result) || result._notValid) {
        errorsObject._notValid = true;
        errorsObject[key] = result;
      }
    });

    return errorsObject._notValid ? errorsObject : value;
  };

  return this;
}

export default object;
