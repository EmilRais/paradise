
export interface Action {
    reject(messages: string[]): void;
    ignore(): void;
    accept(): void;
}

export abstract class Rule {
    abstract validate(path: string, value: any, action: Action): void;

    guard(value: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.validate("$", value, {
                reject: (messages: string[]) => { reject(messages); },
                ignore: () => { resolve(); },
                accept: () => { resolve(); }
            });
        });
    }
}
