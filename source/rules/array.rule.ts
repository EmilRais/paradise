import * as async from "async";

import { Action, Rule } from "../models";
import { isPresent, isArray } from "../predicates";
import { AllRule } from "../rules";

export class ArrayRule extends Rule {

    constructor(private rules?: Rule[]) {
        super();
    }

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isArray(value) ) return action.reject([`"${path}" was not an array`]);
        if ( !this.rules ) return action.accept();

        let index = 0;
        async.reduce(value, [], (result, someValue, next) => {
            const somePath = `${path}[${index}]`;
            const someRule = new AllRule(this.rules);
            index += 1;

            someRule.validate(somePath, someValue, {
                ignore: () => { next(null, result); },
                accept: () => { next(null, result); },
                reject: (messages: string[]) => { next(null, result.concat(messages)); }
            });
        }, (error, messages) => {
            if ( messages.length === 0 ) return action.accept();
            return action.reject(messages);
        });
    }
}
