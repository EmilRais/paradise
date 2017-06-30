import { isPresent, isString } from "./predicates";
import { Action, Rule } from "./rule.model";

export class String implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( isString(value) ) return action.accept();

        return action.reject([`"${path}" was not a string`]);
    }
}
