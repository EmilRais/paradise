import * as async from "async";

import { Action, Rule } from "../models";
import { isPresent, isObject } from "../predicates";
import { AllRule, Schema } from "../rules";

export class MandatoryFieldsRule extends Rule {

    constructor(private schema: Schema) {
        super();
    }

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isObject(value) ) return action.ignore();

        const fields = Object.keys(this.schema);
        async.reduce(fields, [], (result, key, next) => {
            const somePath = `${path}.${key}`;

            if ( !(key in value) )
                return next(null, result.concat([`"${somePath}" was missing`]));

            const someValue = value[key];
            const someRule = new AllRule(this.schema[key]);

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
