import { isBoolean, isPresent } from "./predicates";
import { Action, Rule } from "./rule.model";

export class Boolean implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isBoolean(value) ) return action.accept();

        return action.reject([`"${path}" was not a boolean`]);
    }
}
