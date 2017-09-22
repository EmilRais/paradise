import * as chai from "chai";

import { MandatoryFieldsRule, RequiredRule, StringRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("MandatoryFieldsRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new MandatoryFieldsRule({});
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if value is not an object", () => {
        const rule = new MandatoryFieldsRule({});
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should reject if field is missing", () => {
        const rule = new MandatoryFieldsRule({ someField: [], otherField: [] });
        const value = { someField: 42 };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$.otherField" was missing']);
        });
    });

    it("should reject if any fields are rejected", () => {
        const rule = new MandatoryFieldsRule({ someField: [new RequiredRule(), new StringRule()], otherField: [] });
        const value = { someField: 42 };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal([
                '"$.someField" was not a string',
                '"$.otherField" was missing'
            ]);
        });
    });

    it("should accept if no fields are rejected", () => {
        const rule = new MandatoryFieldsRule({ someField: [new RequiredRule(), new StringRule()], otherField: [] });
        const value = { someField: "some-value", otherField: 42 };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

});
