import { Action, AsyncAction } from './action.js';
import readline from 'node:readline/promises';

const simpleSum = new Action().define((numbers) =>
    numbers.reduce((acc, number) => acc + number, 0)
);

const plusTwoPlusThree = new Action()
    .define((number) => number + 2)
    .chain((action) => action.define((number) => number + 3));

const withFallback = new Action()
    .define(() => {
        throw new Error('Something went wrong');
    })
    .fallback((e) => {
        console.error(e);
        return 'Default after fallback';
    });

const withChainedFallback = new Action()
    .define((person) => {
        console.log(`${person.name} is trying to do something`);

        return {
            ...person,
            didSomething: Math.random() > 0.5
        };
    })
    .chain((action) =>
        action
            .define((person) => {
                if (!person.didSomething) {
                    throw new Error('Person did not do something');
                }

                return 'Person did something successfully';
            })
            .fallback((_, person) => {
                return `${person.name} couldn't do something`;
            })
    );

const asyncChainedActions = new AsyncAction()
    .define((name) => {
        console.log(`Hello, ${name}!\n`);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return rl;
    })
    .chain((action) =>
        action
            .define(async (rl) => {
                const number = await rl.question('What is your favorite number?\n');
                const color = await rl.question('What is your favorite color?\n');
                rl.close();

                return {
                    color,
                    number
                };
            })
            .chain((action) =>
                action.define(({ number, color }) => {
                    for (let i = 0; i < number; i++) {
                        console.log(`You love ${color} x ${i + 1}`);
                    }

                    return 'Thank you for answering!';
                })
            )
    );

const testCode = new Action()
    .define(({ value, expected, name }) => {
        if (value === expected) {
            console.log(`${name} passed!`);
        } else {
            throw new Error('Test failed!');
        }
    })
    .fallback((e, { value, expected }) => {
        console.error(`${e}\n${value} is not equal to ${expected}`);
    });

console.log(simpleSum.trigger([1, 2, 3, 4, 5]));
console.log('--------------------');
console.log(plusTwoPlusThree.trigger(1));
console.log('--------------------');
console.log(withFallback.trigger());
console.log('--------------------');
testCode.trigger({
    value: Number(Math.random() > 0.5),
    expected: 1,
    name: 'One should be equal to one'
});
console.log('--------------------');
for (let i = 1; i < 6; i++) {
    console.log(withChainedFallback.trigger({ name: 'John Doe #' + i }));
    console.log('--------------------');
}

(async () => {
    console.log(await asyncChainedActions.trigger('John Doe'));
})();
