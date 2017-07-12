import * as chai from "chai";

import { CountryRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("CountryRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new CountryRule();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if value is not a string", () => {
        const rule = new CountryRule();
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if value is a country", () => {
        const rule = new CountryRule();
        const value = "Denmark";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if value is not a country", () => {
        const rule = new CountryRule();
        const value = "Europe";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was not a country']);
        });
    });

});
