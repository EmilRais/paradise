import * as chai from "chai";

import { OptionalFieldsRule, RequiredRule, StringRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("OptionalFieldsRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new OptionalFieldsRule({});
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if value is not an object", () => {
        const rule = new OptionalFieldsRule({});
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept missing fields", () => {
        const rule = new OptionalFieldsRule({ someField: [new RequiredRule(), new StringRule()], otherField: [] });
        const value = { otherField: 42 };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if any fields are rejected", () => {
        const rule = new OptionalFieldsRule({ someField: [new RequiredRule(), new StringRule()], otherField: [] });
        const value = { someField: 42 };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal([
                '"$.someField" was not a string'
            ]);
        });
    });

    it("should accept if no fields are rejected", () => {
        const rule = new OptionalFieldsRule({ someField: [new RequiredRule(), new StringRule()], otherField: [] });
        const value = { someField: "some-value" };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

});
