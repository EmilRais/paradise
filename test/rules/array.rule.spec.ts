import * as chai from "chai";

import { ArrayRule, RequiredRule, StringRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("ArrayRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new ArrayRule();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should reject if value is not an array", () => {
        const rule = new ArrayRule();
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was not an array']);
        });
    });

    it("should accept if array and no rules specified", () => {
        const rule = new ArrayRule();
        const value = [42, null, "some-value"];
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if any items are rejected", () => {
        const rule = new ArrayRule([new RequiredRule()]);
        const value = [42, null, "some-value"];
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$[1]" was missing']);
        });
    });

    it("should accept if no items are rejected", () => {
        const rule = new ArrayRule([new StringRule()]);
        const value: any[] = [null, undefined];
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Accept);
        });
    });

});
