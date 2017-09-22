import { Action, Rule } from "../models";
import { isPresent, isObject } from "../predicates";

export class ObjectRule extends Rule {

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isObject(value) ) return action.reject([`"${path}" was not an object`]);
        action.accept();
    }
}
