import * as chai from "chai";

import { MultipleRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("MultipleRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new MultipleRule(14);
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if value is not a number", () => {
        const rule = new MultipleRule(14);
        const value = "some-string";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if value is a multiple of target", () => {
        const rule = new MultipleRule(14);
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if value is not a multiple of target", () => {
        const rule = new MultipleRule(14);
        const value = 40;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was 40 but should be a multiple of 14']);
        });
    });

});
