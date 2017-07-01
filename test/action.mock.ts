import { Action } from "../source/core";

export class Reject { constructor(public messages: string[]) {} }
export class Ignore {}
export class Accept {}

export class ActionMock implements Action {
    private promise: Promise<Reject | Ignore | Accept>;
    private resolve: (result: Reject | Ignore | Accept) => void;

    constructor() {
        this.promise = new Promise<Reject | Ignore | Accept>((resolve, reject) => {
            this.resolve = resolve;
        });
    }

    reject(messages: string[]): void {
        this.resolve(new Reject(messages));
    }

    ignore(): void {
        this.resolve(new Ignore());
    }

    accept(): void {
        this.resolve(new Accept());
    }

    check(callback: (result: Reject | Ignore | Accept) => void): Promise<void> {
        return this.promise.then(callback);
    }
}
