const currencyCodes = require("currency-codes");
import { Action, Rule } from "../models";
import { isPresent, isString } from "../predicates";

export class CurrencyRule extends Rule {

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isString(value) ) return action.ignore();
        if ( this.isCurrencyCode(value) ) return action.accept();

        return action.reject([`"${path}" was not a currency code`]);
    }

    private isCurrencyCode(value: string): boolean {
        return !!currencyCodes.code(value);
    }
}
