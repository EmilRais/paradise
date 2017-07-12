import * as chai from "chai";
import { Promise } from "es6-promise";

import { NumberRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("NumberRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new NumberRule();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if value is a number", () => {
        const rule = new NumberRule();
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if value is not a number", () => {
        const rule = new NumberRule();
        const value = "some-string";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was not a number']);
        });
    });

});
