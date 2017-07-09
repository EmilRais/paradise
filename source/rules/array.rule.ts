import * as async from "async";

import { Action, Rule, isPresent, isArray } from "../core";
import { AllRule } from "./all.rule";

export class ArrayRule implements Rule {
    rule: AllRule;

    constructor(rules: Rule[]) {
        this.rule = new AllRule(rules);
    }

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isArray(value) ) return action.reject([`"${path}" was not an array`]);

        let index = 0;
        async.reduce(value, [], (result, someValue, next) => {
            const somePath = `${path}[${index}]`;
            index += 1;

            this.rule.validate(somePath, someValue, {
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
