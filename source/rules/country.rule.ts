const countryList = require("country-list")();
import { Action, Rule, isPresent, isString } from "../core";

export class CountryRule implements Rule {
    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isString(value) ) return action.ignore();
        if ( this.isCountry(value) ) return action.accept();

        return action.reject([`"${path}" was not a country`]);
    }

    private isCountry(value: string): boolean {
        const countries = countryList.getNameList();
        return !!countries[value.toLowerCase()];
    }
}