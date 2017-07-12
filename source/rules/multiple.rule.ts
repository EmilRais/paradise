import { Action, Rule } from "../models";
import { isPresent, isNumber } from "../predicates";

export class MultipleRule implements Rule {
    constructor(private target: number) {}

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isNumber(value) ) return action.ignore();
        if ( this.isMultipleOfTarget(value) ) return action.accept();

        return action.reject([`"${path}" was ${value} but should be a multiple of ${this.target}`]);
    }

    private isMultipleOfTarget(value: number): boolean {
        return value % this.target === 0;
    }
}
