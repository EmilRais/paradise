import * as async from "async";

import { Action, Rule } from "../models";

export class AnyRule implements Rule {
    constructor(private rules: Rule[]) {}

    validate(path: string, value: any, action: Action): void {
        async.reduce(this.rules, null, (result, rule, next) => {
            rule.validate(path, value, {
                ignore: () => { next(null, result); },
                accept: () => { next({}, []); },
                reject: (messages: string[]) => { next(null, (result || []).concat(messages)); }
            });
        }, (error, messages) => {
            if ( messages === null ) return action.ignore();
            if ( messages.length === 0 ) return action.accept();
            return action.reject(messages);
        });
    }
}
