class NotImplementedError extends Error {
    constructor(name) {
        super(`${name} is not implemented`);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotImplementedError); // Captures a stack trace for an error
        }
    }
}

class Document {
    constructor(name) {
        this.name = name;
    }
}

// Javascript does not have interfaces, but we can simulate them using classes
// TypeScript has interfaces, which are a better way to implement the Interface Segregation Principle
// This is our Interface
class Machine {
    constructor() {
        if (this.constructor.name === 'Machine') {
            throw new Error('Machine is an abstract class'); // This way we can't create an instance of Machine. Is ugly, but is the JS way since we don't have abstract classes
        }
    }

    print(doc) {} // This way we can use the same function for all machines, and we can be sure that it will work for all machines
    fax(doc) {} // This way we can use the same function for all machines, and we can be sure that it will work for all machines
    scan(doc) {} // This way we can use the same function for all machines, and we can be sure that it will work for all machines
}

class MultiFunctionPrinter extends Machine {
    print(doc) {
        // Do something
    }

    fax(doc) {
        // Do something
    }

    scan(doc) {
        // Do something
    }
}

// This is not user friendly, since printer and fax are not implemented, making it an anti-pattern
class OldFashionedPrinter extends Machine {
    print(doc) {
        // Do something
    }

    // The following methods are not implemented because OldFashionedPrinter is an old fashioned printer and it can't fax or scan
    fax(doc) {
        // We can avoid this by not implementing the method, but it will call the parent method which is also empty
        // But we need to comply to the principle of least surprise, we need predictable results for our users
        // So we need throw an error to let the user know that this method is not implemented and will not work because the printer is old fashioned
        throw new ErrNotImplementedErroror('fax');
    }

    scan(doc) {
        // We can avoid this by not implementing the method
        // But we need to comply to the principle of least surprise, we need predictable results for our users
        // So we need throw an error to let the user know that this method is not implemented and will not work because the printer is old fashioned
        throw new NotImplementedError('scan');
    }
}

let printer = new OldFashionedPrinter();

printer.fax(); // This will throw an error because the method is not implemented

// This means that Machine is not a good interface, because it has methods that are not implemented by all machines

// We can fix this by creating interfaces that are more specific to the machine

class Printer {
    constructor() {
        if (this.constructor.name === 'Printer') {
            throw new Error('Printer is an abstract class');
        }
    }

    print(doc) {}
}

class Scanner {
    constructor() {
        if (this.constructor.name === 'Scanner') {
            throw new Error('Scanner is an abstract class');
        }
    }

    scan(doc) {}
}

// This is not possible in JS, but you get the idea
// class MultiFunctionDevice extends Printer, Scanner {
//     constructor() {
//         super();
//     }
// }

// We can do a JS Hack, that is really complex and obscure and I think I will never use it, so no worth to learn it now
// but the idea is to segregate the interfaces in a way that we don't leave dangling methods that are not implemented by all machines
