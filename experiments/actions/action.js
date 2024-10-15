export class Action {
    #chainedActions = [];
    #definition = undefined;
    #fallback = undefined;

    constructor() {}

    define(definition) {
        this.#definition = definition;
        return this;
    }

    fallback(fallback) {
        this.#fallback = fallback;
        return this;
    }

    chain(action) {
        const actionBuilder = new Action();

        this.#chainedActions.push(action(actionBuilder));

        return this;
    }

    trigger(args) {
        if (!this.#definition) {
            throw new Error('Action not defined');
        }

        try {
            const returnValue = this.#definition(args);
            return this.#chainedActions.length
                ? this.#chainedActions.reduce((acc, action) => action.trigger(acc), returnValue)
                : returnValue;
        } catch (e) {
            if (!this.#fallback) {
                throw e;
            }

            return this.#fallback(e, args);
        }
    }
}
export class AsyncAction {
    #chainedActions = [];
    #definition = undefined;
    #fallback = undefined;

    constructor() {}

    define(definition) {
        this.#definition = definition;
        return this;
    }

    fallback(fallback) {
        this.#fallback = fallback;
        return this;
    }

    chain(asyncAction) {
        const asyncActionBuilder = new AsyncAction();
        this.#chainedActions.push(asyncAction(asyncActionBuilder));

        return this;
    }

    async trigger(args) {
        if (!this.#definition) {
            throw new Error('Action not defined');
        }

        let returnValue = undefined;

        try {
            returnValue = await this.#definition(args);
            return this.#chainedActions.length
                ? this.#chainedActions.reduce(
                      async (acc, action) => await action.trigger(acc),
                      returnValue
                  )
                : returnValue;
        } catch (e) {
            if (!this.#fallback) {
                throw e;
            }

            return await this.#fallback(e, args);
        }
    }
}
