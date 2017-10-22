import { Action, Rule } from "../models";
import { isPresent, isBoolean, isNumber, isString } from "../predicates";

export class ValueRule extends Rule {
    constructor(private targets: Array<boolean | number | string>) {
        super();
    }

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();

        const foundMatch = this.targets.some(target => target === value);
        if ( foundMatch ) return action.accept();

        return action.reject([`"${path}" was ${value} but should be ${this.targets.join(" | ")}`]);
    }
}
