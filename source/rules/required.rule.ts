import { Action, Rule } from "../models";
import { isPresent } from "../predicates";

export class RequiredRule extends Rule {

    validate(path: string, value: any, action: Action): void {
        if ( isPresent(value) ) return action.accept();

        return action.reject([`"${path}" was missing`]);
    }
}
