import * as chai from "chai";
import { Promise } from "es6-promise";

import { RegexRule } from "../../source/rules/regex.rule";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("RegexRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new RegexRule(/some/);
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if value is not a string", () => {
        const rule = new RegexRule(/some/);
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if value matches pattern", () => {
        const rule = new RegexRule(/some/);
        const value = "some-string";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if value does not match pattern", () => {
        const rule = new RegexRule(/some/);
        const value = "another-string";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" did not satisfy pattern /some/']);
        });
    });

});
