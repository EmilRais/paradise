import * as async from "async";

import { Action, Rule } from "../core";
import { isPresent, isObject } from "../predicates";
import { AllRule } from "./all.rule";

export interface Schema {
    [keys: string]: Rule[];
}

export class ObjectRule implements Rule {
    constructor(private schema?: Schema) {}

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isObject(value) ) return action.reject([`"${path}" was not an object`]);
        if ( !this.schema ) return action.accept();

        const unspecifiedFieldMessages = this.checkForUnspecifiedFields(path, value);

        const keys = Object.keys(this.schema);
        async.reduce(keys, [], (result, key, next) => {
            const somePath = `${path}.${key}`;
            const someValue = value[key];
            const someRule = new AllRule(this.schema[key]);

            someRule.validate(somePath, someValue, {
                ignore: () => { next(null, result); },
                accept: () => { next(null, result); },
                reject: (messages: string[]) => { next(null, result.concat(messages)); }
            });
        }, (error, contentMessages) => {
            const messages = unspecifiedFieldMessages.concat(contentMessages);

            if ( messages.length === 0 ) return action.accept();
            return action.reject(messages);
        });
    }

    private checkForUnspecifiedFields(path: string, value: object): string[] {
        return Object.keys(value)
            .filter(key => !this.schema.hasOwnProperty(key))
            .map(key => `"${path}" has unrecognised field "${key}"`);
    }
}
