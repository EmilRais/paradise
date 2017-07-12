import * as chai from "chai";
import { Promise } from "es6-promise";

import { AnyRule } from "../../source/rules/any.rule";
import { CountryRule } from "../../source/rules/country.rule";
import { EmailRule } from "../../source/rules/email.rule";
import { MultipleRule } from "../../source/rules/multiple.rule";
import { NumberRule } from "../../source/rules/number.rule";
import { RequiredRule } from "../../source/rules/required.rule";
import { StringRule } from "../../source/rules/string.rule";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("AnyRule", () => {

    it("should ignore if no rules", () => {
        const rule = new AnyRule([]);
        const value: any = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if all rules are ignored", () => {
        const rules = [new EmailRule(), new CountryRule()];
        const rule = new AnyRule(rules);
        const value: any = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if any rule is accepted", () => {
        const rules = [new NumberRule(), new StringRule()];
        const rule = new AnyRule(rules);
        const value: any = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if any rule is rejected and none are accepted", () => {
        const rules = [new StringRule(), new MultipleRule(5), new EmailRule()];
        const rule = new AnyRule(rules);
        const value: any = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal([
                `"$" was not a string`,
                `"$" was 42 but should be a multiple of 5`
            ]);
        });
    });

});