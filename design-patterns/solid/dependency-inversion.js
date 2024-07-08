// Dependency Inversion Principle (DIP)
// High-level modules should not depend on low-level modules. Both should depend on abstractions.

// An enum to represent the relationship between two people
const Relationship = Object.freeze({
    parent: 0,
    child: 1,
    sibling: 2
});

// Basic High Level module, this could have a lot of methods to work with people
class Person {
    constructor(name) {
        this.name = name;
    }
}

class RelationshipBrowser {
    constructor() {
        if (this.constructor.name === 'RelationshipBrowser') {
            throw new Error('RelationshipBrowser is abstract!');
        }
    }

    findAllChildrenOf(name) {
        throw new Error('findAllChildrenOf is abstract!');
    }
}

// Low-level module, a low level module is a module that works with High-level modules as Person and Relationships
// Is basically a module that stores data and manage High-level modules
class Relationships extends RelationshipBrowser {
    constructor() {
        super();
        this.data = [];
    }

    // Not mentioned but this violates the open-closed principle, we can have N combinations of relationships
    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child
        });
    }
    // This way Research class can use this method to find all children of a person and don't need to know how the data is stored
    findAllChildrenOf(name) {
        return this.data
            .filter((r) => r.from.name === name && r.type === Relationship.parent)
            .map((r) => r.to);
    }
}

// High-level module, because it uses low-level modules and works
class Research {
    // This class is tightly coupled with Relationships class, if we want to change the way we store relationships we need to change this class
    // This means that it violates the dependency inversion principle
    // if we refactor the Relationships class to use a database, we need to change this class
    // constructor(relationships) {
    //     // Find all children of John
    //     let relations = relationships.data;
    //     let childrenOfJohn = relations.filter(
    //         (r) => r.from.name === 'John' && r.type === Relationship.parent
    //     );
    //     for (let rel of childrenOfJohn) {
    //         console.log(`John has a child named ${rel.to.name}`);
    //     }
    // }

    // This way we can use the RelationshipBrowser interface to find all children of a person and don't need to know how the data is stored
    // Now the High Level module doesn't depend on the Low Level module, it depends on an abstraction
    // If browser changes the way it finds children, we don't need to change this class, because it should have the same interface
    constructor(browser) {
        let childrenOfJohn = browser.findAllChildrenOf('John');
        for (let { name } of childrenOfJohn) {
            console.log(`John has a child named ${name}`);
        }
    }
}

let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

let relationships = new Relationships();

relationships.addParentAndChild(parent, child1);
relationships.addParentAndChild(parent, child2);

new Research(relationships); // Will print John has a child named Chris and John has a child named Matt
