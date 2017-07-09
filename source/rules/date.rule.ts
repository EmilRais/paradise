import { Action, Rule, isPresent, isDate } from "../core";

export class DateRule implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isDate(value) ) return action.accept();

        return action.reject([`"${path}" was not a date`]);
    }
}
