import { Action, Rule, isNumber, isPresent } from "../core";

export class Number implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isNumber(value) ) return action.accept();

        return action.reject([`"${path}" was not a number`]);
    }
}
