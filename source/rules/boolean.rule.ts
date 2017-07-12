import { Action, Rule } from "../models";
import { isBoolean, isPresent } from "../predicates";

export class BooleanRule extends Rule {

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isBoolean(value) ) return action.accept();

        return action.reject([`"${path}" was not a boolean`]);
    }
}
