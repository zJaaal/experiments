// Use case example

class NotAGoodPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // This is not allowed because the constructor is already defined
    // constructor(rho, theta) {
    //   this.x = rho * Math.cos(theta);
    //   this.y = rho * Math.sin(theta);
    // }
}

const CoordinateSystem = {
    CARTESIAN: 'cartesian',
    POLAR: 'polar'
};

// Also not a good idea to have a constructor like this
class NotSoGoodPoint {
    // a and b are not verbatim of what they are and they change their meaning per coordinate system
    // What if we want an R3 point?
    // What if we need more complicated logic?
    constructor(a, b, coordinateSystem = CoordinateSystem.CARTESIAN) {
        switch (coordinateSystem) {
            case CoordinateSystem.CARTESIAN:
                this.x = a;
                this.y = b;
                break;
            case CoordinateSystem.POLAR:
                this.x = a * Math.cos(b);
                this.y = a * Math.sin(b);
                break;
        }
    }
}

// Factory methods
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static newCartesianPoint(x, y) {
        return new Point(x, y);
    }

    static newPolarPoint(rho, theta) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
}

// Factory method is a static method that returns an instance of the class
const p1 = Point.newCartesianPoint(4, 5);
const p2 = Point.newPolarPoint(5, Math.PI / 2);

// Test
console.log(p1, p2);
