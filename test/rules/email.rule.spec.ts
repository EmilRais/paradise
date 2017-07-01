import * as chai from "chai";
import { Promise } from "es6-promise";

import { EmailRule } from "../../source/rules/email.rule";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("EmailRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new EmailRule();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if value is not a string", () => {
        const rule = new EmailRule();
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if value is an email address", () => {
        const rule = new EmailRule();
        const value = "someone@github.com";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if value is not an email address", () => {
        const rule = new EmailRule();
        const value = "someone@github";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was not an email address']);
        });
    });

});
