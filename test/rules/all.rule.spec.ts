import * as chai from "chai";

import { AllRule, CountryRule, EmailRule, MultipleRule, NumberRule, RequiredRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("AllRule", () => {

    it("should ignore if no rules", () => {
        const rule = new AllRule([]);
        const value: any = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if all rules are ignored", () => {
        const rules = [new EmailRule(), new CountryRule()];
        const rule = new AllRule(rules);
        const value: any = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if any rule is accepted and none are rejected", () => {
        const rules = [new RequiredRule(), new EmailRule(), new CountryRule()];
        const rule = new AllRule(rules);
        const value: any = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if any rule is rejected", () => {
        const rules = [new RequiredRule(), new NumberRule(), new MultipleRule(5)];
        const rule = new AllRule(rules);
        const value: any = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was 42 but should be a multiple of 5']);
        });
    });

});
