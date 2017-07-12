const countryList = require("country-list")();
import { Action, Rule } from "../models";
import { isPresent, isString } from "../predicates";

export class CountryCodeRule implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isString(value) ) return action.ignore();
        if ( this.isCountryCode(value) ) return action.accept();

        return action.reject([`"${path}" was not a country code`]);
    }

    private isCountryCode(value: string): boolean {
        const countryCodes = countryList.getCodeList();
        return !!countryCodes[value.toLowerCase()];
    }
}
