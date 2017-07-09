import * as chai from "chai";
import { Promise } from "es6-promise";

import { ObjectRule } from "../../source/rules/object.rule";
import { RequiredRule } from "../../source/rules/required.rule";
import { StringRule } from "../../source/rules/string.rule";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("ObjectRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new ObjectRule();
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should reject if value is not an object", () => {
        const rule = new ObjectRule();
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" was not an object']);
        });
    });

    it("should accept if an object and no schema specified", () => {
        const rule = new ObjectRule();
        const value: any[] = [];
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    it("should reject if object contains unspecified fields", () => {
        const rule = new ObjectRule({ someField: [] });
        const value = { someField: 42, otherField: "some-value" };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" has unrecognised field "otherField"']);
        });
    });

    it("should reject if any fields are rejected", () => {
        const rule = new ObjectRule({ someField: [new RequiredRule(), new StringRule()] });
        const value = { someField: 42, otherField: "some-value" };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal([
                '"$" has unrecognised field "otherField"',
                '"$.someField" was not a string'
            ]);
        });
    });

    it("should accept if no fields are rejected", () => {
        const rule = new ObjectRule({ someField: [new RequiredRule(), new StringRule()] });
        const value = { someField: "some-value" };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

});
