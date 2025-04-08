// This class is abstract and cannot be instantiated
class HotDrink {
    persons = [];
    consume() {}
}

// Concrete classes
class Tea extends HotDrink {
    consume() {
        console.log('This tea is nice with lemon!');
    }
}

// Concrete classes
class Coffee extends HotDrink {
    consume() {
        console.log('This coffee is delicious!');
    }
}

// Abstract factory
class HotDrinkFactory {
    prepare(amount) {}
}

// Concrete factories
class TeaFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Put in tea bag, boil water, pour ${amount}ml, add lemon, enjoy!`);
        return new Tea();
    }
}

// Concrete factories
class CoffeeFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Grind some beans, boil water, pour ${amount}ml, add cream and sugar, enjoy!`);
        return new Coffee();
    }
}

const teaFactory = new TeaFactory();
const coffeeFactory = new CoffeeFactory();

const tea = teaFactory.prepare(200);
tea.consume();

const coffee = coffeeFactory.prepare(50);
coffee.consume();

// Abstract factory that can be used to create different types of drinks
class HotDrinkMachine {
    makeDrink(type) {
        switch (type) {
            case 'tea':
                return new TeaFactory().prepare(200);
            case 'coffee':
                return new CoffeeFactory().prepare(50);
            default:
                throw new Error('Invalid drink');
        }
    }
}

const machine = new HotDrinkMachine();
const teaFromMachine = machine.makeDrink('tea');
teaFromMachine.consume();

const coffeeFromMachine = machine.makeDrink('coffee');
coffeeFromMachine.consume();

// This is a better way to create a machine
const AvailableDrink = Object.freeze({
    tea: TeaFactory,
    coffee: CoffeeFactory
});

// Complying with Open/Closed Principle
class BetterHotDrinkMachine {
    constructor() {
        this.factories = {};
        for (const [key, drink] of Object.entries(AvailableDrink)) {
            this.factories[key] = new drink();
        }
    }

    interact(name, amount) {
        console.log(this.factories);

        if (this.factories.hasOwnProperty(name)) {
            return this.factories[name].prepare(amount);
        }

        return null;
    }
}

const betterMachine = new BetterHotDrinkMachine();
const teaFromBetterMachine = betterMachine.interact('tea', 200);
teaFromBetterMachine.consume();
