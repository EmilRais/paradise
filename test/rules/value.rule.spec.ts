import * as chai from "chai";

import { ValueRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("ValueRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new ValueRule(["alice", "bob", "charlie"]);
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if value is neither boolean, number or string", () => {
        const rule = new ValueRule(["alice", "bob", "charlie"]);
        const value = {};
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if value is a target value", () => {
        const rule = new ValueRule(["alice", "bob", "charlie"]);
        const value = "alice";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if value is not a target value", () => {
        const rule = new ValueRule(["alice", "bob", "charlie"]);
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was 42 but should be alice | bob | charlie']);
        });
    });

});
