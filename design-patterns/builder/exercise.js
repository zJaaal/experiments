// Exercise

class CodeBuilder {
    constructor(className) {
        this.className = className;
        this.fields = [];
    }

    addField(name) {
        this.fields.push(name);
        return this;
    }

    toString() {
        const mappedFields =
            this.fields.map((field) => `    this.${field} = ${field};`).join('\n') + '\n  }\n';

        const constructor = this.fields.length
            ? `  constructor(${this.fields.join(', ')}) {\n${mappedFields}`
            : '';

        const classString = `class ${this.className} {\n${constructor}}`;

        return classString;
    }
}

let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());

// Output:
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// Empty class
cb = new CodeBuilder('Foo');
console.log(cb.toString());

// Output:
// class Foo {
// }
