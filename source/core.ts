import { Promise } from "es6-promise";

export interface Action {
    reject(messages: string[]): void;
    ignore(): void;
    accept(): void;
}

export interface Rule {
    validate(path: string, value: any, action: Action): void;
}
