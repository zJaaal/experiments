import schemaBuilder from "./schema-builder/index.js";
//Builder Pattern
console.clear();
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
const jalValidator = schemaBuilder.object({
  name: schemaBuilder.string().min(3).max(8).regex(/^J/).required(),

  lastName: schemaBuilder.string().min(4).max(7).required(),

  age: schemaBuilder.number().min(18).max(21).required(),

  working: schemaBuilder.boolean().required(),

  address: schemaBuilder.object({
    street: schemaBuilder.string().required(),
    floor: schemaBuilder.number().required(),
    zipCode: schemaBuilder.string().required(),
    country: schemaBuilder.string().required(),
  }),
});

console.log(jalValidator.execute(Jal));
