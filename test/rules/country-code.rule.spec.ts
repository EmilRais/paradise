import * as chai from "chai";
import { Promise } from "es6-promise";

import { CountryCodeRule } from "../../source/rules/country-code.rule";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("CountryCodeRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new CountryCodeRule();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if value is not a string", () => {
        const rule = new CountryCodeRule();
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if value is a country code", () => {
        const rule = new CountryCodeRule();
        const value = "DK";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if value is not a country code", () => {
        const rule = new CountryCodeRule();
        const value = "DA";
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was not a country code']);
        });
    });

});
