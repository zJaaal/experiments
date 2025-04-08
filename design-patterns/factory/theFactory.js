class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static get factory() {
        return new PointFactory();
    }
}

// Separate the factory from the class
class PointFactory {
    static newCartesianPoint(x, y) {
        return new Point(x, y);
    }

    static newPolarPoint(rho, theta) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
}

// Test
const p1 = PointFactory.newCartesianPoint(4, 5);
const p2 = PointFactory.newPolarPoint(5, Math.PI / 2);

// Using the factory method
const p3 = Point.factory.newCartesianPoint(4, 5);
const p4 = Point.factory.newPolarPoint(5, Math.PI / 2);

console.log(p1, p2, p3, p4);
