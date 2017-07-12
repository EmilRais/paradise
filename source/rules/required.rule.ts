import { Action, Rule } from "../core";
import { isPresent } from "../predicates";

export class RequiredRule implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( isPresent(value) ) return action.accept();

        return action.reject([`"${path}" was missing`]);
    }
}
