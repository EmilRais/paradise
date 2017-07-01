import { Action, Rule, isPresent, isString } from "../core";

export class Regex implements Rule {
    constructor(private pattern: RegExp) {}

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isString(value) ) return action.ignore();
        if ( this.satisfiesRegex(value) ) return action.accept();

        return action.reject([`"${path}" did not satisfy pattern ${this.pattern}`]);
    }

    satisfiesRegex(value: string): boolean {
        return !!value.match(this.pattern);
    }
}