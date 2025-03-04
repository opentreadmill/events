import { describe, it, expect, vi } from "vitest";
import { Events } from "../index.js";

describe("Events Module", () => {
    it("should dispatch event with string type", () => {
        const events = new Events({
            type1: []
        });

        const callback = vi.fn();

        events.on('type1', callback);
        events.dispatch('type1');

        expect(callback).toHaveBeenCalledOnce();
    });

    it("should dispatch event with custom event type and details", () => {
        let callbackCalled = false;
        const events = new Events({type1: []}),
            callback = (e) => {
                callbackCalled = true;
                expect(e.detail).toEqual({any: 'data'});
            };

        events.on('type1', callback);
        events.dispatch(new CustomEvent('type1', {detail: {any: 'data'}}));
        expect(callbackCalled).toBe(true);
    });

    it("should call once-callbacks only one time", () => {
        const events = new Events({type1: []}),
            callback = vi.fn();

        events.once('type1', callback);
        events.dispatch('type1');
        events.dispatch('type1');
        expect(callback).toHaveBeenCalledOnce();
    })
});
