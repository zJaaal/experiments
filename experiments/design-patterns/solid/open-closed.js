// Just enums to handle constants
let Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});

let Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large'
});

// Class that represents a product
class Product {
    constructor({ name, color, size }) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

// Objects are open for extension but closed for modification.
class ProductFilter {
    // This class represents the anti-pattern of the open-closed principle

    filterByColor(products, color) {
        return products.filter((p) => p.color === color);
    }
    // This is modifying the class, we should avoid this
    filterBySize(products, size) {
        return products.filter((p) => p.size === size);
    }
    // This is modifying the class, we should avoid this
    filterBySizeAndColor(products, size, color) {
        return products.filter((p) => p.size === size && p.color === color);
    }

    // State space explosion, with more and more criteria the number of methods grows exponentially
    // 3 criteria = 7 methods
    // color
    // size
    // price
    // size and color
    // size and price
    // color and price
    // size and color and price
    // ...
}

// Criterias

// This way we don't need to modify the BetterFilter class to add new criterias
class ColorSpecification {
    constructor(color) {
        this.color = color;
    }

    isSatisfied(item) {
        return item.color === this.color;
    }
}

class SizeSpecification {
    constructor(size) {
        this.size = size;
    }

    isSatisfied(item) {
        return item.size === this.size;
    }
}

// Combinator

// This way we can combine criterias
class AndSpecification {
    constructor(...specs) {
        this.specs = specs;
    }

    isSatisfied(item) {
        return this.specs.every((spec) => spec.isSatisfied(item));
    }
}

// Better filter, that is open for extension but closed for modification
class BetterFilter {
    filter(items, spec) {
        return items.filter((item) => spec.isSatisfied(item));
    }
}
// init products
let products = [
    {
        name: 'Apple',
        color: Color.green,
        size: Size.small
    },
    {
        name: 'Tree',
        color: Color.green,
        size: Size.large
    },
    {
        name: 'House',
        color: Color.blue,
        size: Size.large
    }
].map((p) => new Product(p));

let pf = new ProductFilter();

console.log('Green products (old):');

for (let p of pf.filterByColor(products, Color.green)) {
    console.log(`* ${p.name} is green`);
}

// With this approach we can add new criterias without modifying the BetterFilter class
let bf = new BetterFilter();
let colorSpec = new ColorSpecification(Color.green);

console.log('Green products (new):');

for (let p of bf.filter(products, colorSpec)) {
    console.log(`* ${p.name} is green`);
}

let sizeSpec = new SizeSpecification(Size.large);

console.log('Large and Green products:');

let andSpec = new AndSpecification(colorSpec, sizeSpec);

for (let p of bf.filter(products, andSpec)) {
    console.log(`* ${p.name} is large and green`);
}
