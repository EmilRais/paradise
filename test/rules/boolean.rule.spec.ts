import * as chai from "chai";

import { BooleanRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("BooleanRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new BooleanRule();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if value is a boolean", () => {
        const rule = new BooleanRule();
        const value = false;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if value is not a boolean", () => {
        const rule = new BooleanRule();
        const value = "true";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was not a boolean']);
        });
    });

});
