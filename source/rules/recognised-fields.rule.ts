import { Action, Rule } from "../models";
import { isPresent, isObject } from "../predicates";

export class RecognisedFieldsRule extends Rule {

    constructor(private fields: string[]) {
        super();
    }

    validate(path: string, value: any, action: Action): void {
        if ( !isPresent(value) ) return action.ignore();
        if ( !isObject(value) ) return action.ignore();

        const messages = Object.keys(value)
            .filter(field => !this.isRecognised(field))
            .map(key => `"${path}" has unrecognised field "${key}"`);

        if ( messages.length > 0 )
            return action.reject(messages);

        action.accept();
    }

    private isRecognised(field: string): boolean {
        return this.fields.indexOf(field) !== -1;
    }
}
