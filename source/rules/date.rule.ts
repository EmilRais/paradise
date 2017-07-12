import { Action, Rule } from "../core";
import { isPresent, isDate } from "../predicates";

export class DateRule implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isDate(value) ) return action.accept();

        return action.reject([`"${path}" was not a date`]);
    }
}
