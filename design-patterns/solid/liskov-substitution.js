// Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.

class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get area() {
        return this._width * this._height;
    }

    toString() {
        return `${this._width}x${this._height}`;
    }
}

// This is a violation of Liskov Substitution Principle. Square is a subclass of Rectangle, but it doesn't work as expected.
class Square extends Rectangle {
    constructor(size) {
        super(size, size);
    }

    set width(value) {
        this._width = this._height = value;
    }

    set height(value) {
        this._width = this._height = value;
    }
}

let rc = new Rectangle(2, 3);

console.log(rc.toString());

let sq = new Square(2);

sq.width = 4; // We should not be able to set the width of a square.

console.log(sq.toString(), 'should be 4x4');

// Problem
// This should work for both Rectangle and Square, because Square is a subclass of Rectangle. But it doesn't work for Square, violating Liskov Substitution Principle.
let useIt = (rc) => {
    let width = rc._width; // We should not be able to access the width of a square this way, since is hinted to be a private property
    rc.height = 10; // This will change the width of the square

    console.log(`Expected area of ${10 * width}, got ${rc.area}`);
};

useIt(rc);
useIt(sq); // This will give wrong result, since the width of the square will be changed.

// Teacher didn't provide a solution, but I think I can provide one.

// This way all shapes will have the same interface, and we can use the same function for all shapes, they have different implementations, but the same interface.
// Square and Rectangle are not related in this case, they are both shapes, but they don't share the same properties, so they shouldn't be related in the inheritance chain.
// This way we can use the same function for all shapes, and we can be sure that it will work for all shapes.

class Shape {
    _type = 'Raw Shape';

    get type() {
        return this._type;
    }

    get area() {
        throw new Error('Area method should be implemented');
    }

    toString() {
        throw new Error('toString method should be implemented');
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this._width = width;
        this._height = height;
        this._type = 'Rectangle';
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get area() {
        return this._width * this._height;
    }

    toString() {
        return `${this._width}x${this._height}`;
    }
}

class Square extends Shape {
    constructor(size) {
        super();
        this._size = size;
        this._type = 'Square';
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get area() {
        return this._size * this._size;
    }

    toString() {
        return `${this._size}x${this._size}`;
    }
}

// In this case, useIt is not a valid function, since it relies in the fact that Rectangle and Square are related, but they are not.

// And example would be this new useIt function

useIt = (shapes) => {
    shapes.forEach((shape) => {
        try {
            console.log(`This shape is a ${shape.type} with area ${shape.area}`); // This will work for all shapes, because they all have the same interface
        } catch (error) {
            console.log(error.message); // in case the method is not implemented
        }
    });
};
