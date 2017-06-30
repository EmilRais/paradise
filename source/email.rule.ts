import * as emailValidator from "email-validator";

import { isPresent, isString } from "./predicates";
import { Action, Rule } from "./rule.model";

export class Email implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isString(value) ) return action.ignore();
        if ( this.isEmail(value) ) return action.accept();

        return action.reject([`"${path}" was not an email address`]);
    }

    private isEmail(value: string): boolean {
        return emailValidator.validate(value);
    }
}
