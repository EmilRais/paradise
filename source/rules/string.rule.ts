import { Action, Rule } from "../models";
import { isPresent, isString } from "../predicates";

export class StringRule extends Rule {

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isString(value) ) return action.accept();

        return action.reject([`"${path}" was not a string`]);
    }
}
