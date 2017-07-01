import * as chai from "chai";
import { Promise } from "es6-promise";

import { Action } from "../../source/core";
import { Required } from "../../source/rules/required.rule";

const should = chai.should();

describe("Required", () => {
    it("should accept if value is present", done => {
        const rule = new Required();
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        action.promise.then(() => {
            action.acceptInputs.length.should.equal(1);
            done();
        }).catch(done);
    });

    it("should reject if value is missing", done => {
        const rule = new Required();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        action.promise.then(() => {
            action.rejectInputs.length.should.equal(1);
            action.rejectInputs[0][0][0].should.equal('"$" was missing');
            done();
        }).catch(done);
    });
});

class ActionMock implements Action {
    rejectInputs: IArguments[] = [];
    ignoreInputs: IArguments[] = [];
    acceptInputs: IArguments[] = [];
    promise: Promise<void>;
    private resolve: () => void;

    constructor() {
        this.promise = new Promise<void>((resolve, reject) => {
            this.resolve = resolve;
        });
    }

    reject(messages: string[]): void {
        this.rejectInputs.push(arguments);
        this.resolve();
    }

    ignore(): void {
        this.ignoreInputs.push(arguments);
        this.resolve();
    }

    accept(): void {
        this.acceptInputs.push(arguments);
        this.resolve();
    }
}
