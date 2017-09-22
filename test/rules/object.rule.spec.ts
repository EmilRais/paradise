import * as chai from "chai";

import { ObjectRule, RequiredRule, StringRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("ObjectRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new ObjectRule();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should reject if value is not an object", () => {
        const rule = new ObjectRule();
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was not an object']);
        });
    });

    it("should accept if value is an object", () => {
        const rule = new ObjectRule();
        const value: any[] = [];
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

});
