import { Action, Rule } from "../models";
import { isPresent, isNumber } from "../predicates";

export class NumberRule extends Rule {

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isNumber(value) ) return action.accept();

        return action.reject([`"${path}" was not a number`]);
    }
}
