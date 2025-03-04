export class Events {
    #handlers = {};
    #onceHandlers = {};

    constructor(initial) {
        this.#handlers = initial || {};
    }

    register(eventType) {
        if (!this.#handlers[eventType]) {
            this.#handlers[eventType] = [];
        }

        return this;
    }

    on(eventType, handler) {
        if (typeof this.#handlers[eventType] === 'undefined') {
            throw `unkown event type ${eventType}`;
        }
        
        this.#handlers[eventType].push(handler);

        return this;
    }

    once(eventType, handler) {
        if (typeof this.#handlers[eventType] === 'undefined') {
            throw `unkown event type ${eventType}`;
        }
        else if (typeof this.#onceHandlers[eventType] === 'undefined') {
            this.#onceHandlers[eventType] = [];
        }

        this.#onceHandlers[eventType].push(handler);

        return this;
    }

    remove(eventType, handler) {
        this.#handlers[eventType] = this.#handlers[eventType].filter(element => element != handler);
        this.#onceHandlers[eventType] = this.#onceHandlers[eventType].filter(element => element != handler);

        return this;
    }

    trigger(eventType, detail) {
        this.dispatch(eventType, detail);
    }

    dispatch(eventType, detail) {
        const event = eventType instanceof Event ? eventType : new CustomEvent(eventType, { detail });

        this.#handlers[event.type].forEach(handler => {
            handler(event);
        });

        this.#onceHandlers[event.type]?.forEach(handler => {
            handler(event);
        });

        this.#onceHandlers[event.type] = undefined;

        return this;
    }
}