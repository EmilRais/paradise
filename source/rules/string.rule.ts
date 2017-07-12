import { Action, Rule } from "../core";
import { isPresent, isString } from "../predicates";

export class StringRule implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isString(value) ) return action.accept();

        return action.reject([`"${path}" was not a string`]);
    }
}
