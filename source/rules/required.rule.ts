import { Action, Rule, isPresent } from "../core";

export class Required implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( isPresent(value) ) return action.accept();

        return action.reject([`"${path}" was missing`]);
    }
}