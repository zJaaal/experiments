console.clear();

//This just validates the params of the function before you execute it
//It doesn't support "types" but, implementing the schemaBuilder here, it could indeed support "types"

//So you would add your "Type" and it's Schema

function paramsValidator(callback) {
  let possibleTypes = ["boolean", "string", "number", "array"];
  let typesArray = [];

  this.addParam = function (type) {
    if (!possibleTypes.includes(type.toLowerCase()))
      throw new Error(`${type} is not a supported type, please check the docs`);
    typesArray.push(type);
    return this;
  };

  this.create = function () {
    return (...params) => {
      let typesLength = typesArray.length;

      if (typesLength == 0)
        throw new Error("You must add at least one type to your validator.");

      params.forEach((param, i) => {
        let currentType =
          typeof typesArray[i] == "undefined"
            ? typesArray[typesLength - 1]
            : typesArray[i];

        if (currentType == "array" && !Array.isArray(param)) {
          throw new Error(
            `Parameter number ${
              i + 1
            } has the wrong type, recieved "${typeof param}" expected "${currentType}"`
          );
        }
        if (currentType != "array" && typeof param != currentType)
          throw new Error(
            `Parameter number ${
              i + 1
            } has the wrong type, recieved "${typeof param}" expected "${currentType}"`
          );
      });
      return callback(...params);
    };
  };
  return this;
}

function sumWithoutValidation() {
  return [...arguments].reduce((acc, param) => acc + param);
}

const sumWithValidation = new paramsValidator(sumWithoutValidation)
  .addParam("number")
  .create();

console.log(sumWithValidation(2, 3, 4, 5, 6, 7, 8, 9, 10, 4));
console.log(
  new paramsValidator((lol) => lol).addParam("string").create()("hello World")
);
