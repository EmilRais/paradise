import * as chai from "chai";

import { RecognisedFieldsRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("RecognisedFieldsRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new RecognisedFieldsRule([]);
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if value is not an object", () => {
        const rule = new RecognisedFieldsRule([]);
        const value = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should reject if object contains unspecified fields", () => {
        const rule = new RecognisedFieldsRule(["someField"]);
        const value = { someField: 42, otherField: "some-value" };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check((result: Reject) => {
            result.should.be.instanceOf(Reject);
            result.messages.should.deep.equal(['"$" has unrecognised field "otherField"']);
        });
    });

    it("should accept if no fields are rejected", () => {
        const rule = new RecognisedFieldsRule(["someField"]);
        const value = { someField: "some-value" };
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

});
