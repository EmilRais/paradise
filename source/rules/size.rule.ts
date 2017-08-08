import * as async from "async";

import { Action, Rule } from "../models";
import { isPresent, isNumber, isString, isArray } from "../predicates";

export interface SizeTarget {
    above?: number;
    min?: number;
    exactly?: number;
    max?: number;
    below?: number;
}

export class SizeRule extends Rule {
    constructor(private target: SizeTarget) {
        super();
    }

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isNumber(value) && !isString(value) && !isArray(value) ) return action.ignore();
        const strategy = this.determineStrategy(path, value);

        const messages: string[] = [];

        if ( this.target.above !== undefined && !(strategy.size() > this.target.above) )
            messages.push(strategy.notAbove());

        if ( this.target.min !== undefined && !(strategy.size() >= this.target.min) )
            messages.push(strategy.notMin());

        if ( this.target.exactly !== undefined && strategy.size() !== this.target.exactly )
            messages.push(strategy.notExactly());

        if ( this.target.max !== undefined && !(strategy.size() <= this.target.max) )
            messages.push(strategy.notMax());

        if ( this.target.below !== undefined && !(strategy.size() < this.target.below) )
            messages.push(strategy.notBelow());

        if ( messages.length > 0 ) return action.reject(messages);

        action.accept();
    }

    private determineStrategy(path: string, value: any): Strategy {
        if ( isNumber(value) ) return new NumberStrategy(path, value, this.target);
        if ( isString(value) ) return new StringStrategy(path, value, this.target);
        if ( isArray(value) ) return new ArrayStrategy(path, value, this.target);
        throw new Error("Unable to determine strategy for value - this should not be able to occur");
    }
}

interface Strategy {
    size(): number;
    notAbove(): string;
    notMin(): string;
    notExactly(): string;
    notMax(): string;
    notBelow(): string;
}

class NumberStrategy implements Strategy {
    constructor(private path: string, private value: number, private target: SizeTarget) {}

    size(): number {
        return this.value;
    }

    notAbove(): string {
        return `"${this.path}" was ${this.size()} but should be more than ${this.target.above}`;
    }

    notMin(): string {
        return `"${this.path}" was ${this.size()} but should be at least ${this.target.min}`;
    }

    notExactly(): string {
        return `"${this.path}" was ${this.size()} but should be ${this.target.exactly}`;
    }

    notMax(): string {
        return `"${this.path}" was ${this.size()} but should be at most ${this.target.max}`;
    }

    notBelow(): string {
        return `"${this.path}" was ${this.size()} but should be less than ${this.target.below}`;
    }
}

class StringStrategy implements Strategy {
    constructor(private path: string, private value: string, private target: SizeTarget) {}

    size(): number {
        return this.value.length;
    }

    notAbove(): string {
        return `"${this.path}" was ${this.size()} characters long but should be longer than ${this.target.above}`;
    }

    notMin(): string {
        return `"${this.path}" was ${this.size()} characters long but should be at least ${this.target.min}`;
    }

    notExactly(): string {
        return `"${this.path}" was ${this.size()} characters long but should be ${this.target.exactly}`;
    }

    notMax(): string {
        return `"${this.path}" was ${this.size()} characters long but should be at most ${this.target.max}`;
    }

    notBelow(): string {
        return `"${this.path}" was ${this.size()} characters long but should be shorter than ${this.target.below}`;
    }
}

class ArrayStrategy implements Strategy {
    constructor(private path: string, private value: string, private target: SizeTarget) {}

    size(): number {
        return this.value.length;
    }

    notAbove(): string {
        return `"${this.path}" contained ${this.size()} elements but should contain more than ${this.target.above}`;
    }

    notMin(): string {
        return `"${this.path}" contained ${this.size()} elements but should contain at least ${this.target.min}`;
    }

    notExactly(): string {
        return `"${this.path}" contained ${this.size()} elements but should contain ${this.target.exactly}`;
    }

    notMax(): string {
        return `"${this.path}" contained ${this.size()} elements but should contain at most ${this.target.max}`;
    }

    notBelow(): string {
        return `"${this.path}" contained ${this.size()} elements but should contain less than ${this.target.below}`;
    }
}
