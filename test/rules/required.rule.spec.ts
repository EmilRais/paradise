import * as chai from "chai";
import { Promise } from "es6-promise";

import { RequiredRule } from "../../source/rules/required.rule";
import { ActionMock, Accept, Reject } from "../action.mock";

const should = chai.should();

describe("RequiredRule", () => {

    it("should accept if value is present", () => {
        const rule = new RequiredRule();
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if value is missing", () => {
        const rule = new RequiredRule();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was missing']);
        });
    });

});
