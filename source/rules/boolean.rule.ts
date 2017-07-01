import { Action, Rule, isBoolean, isPresent } from "../core";

export class Boolean implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isBoolean(value) ) return action.accept();

        return action.reject([`"${path}" was not a boolean`]);
    }
}
