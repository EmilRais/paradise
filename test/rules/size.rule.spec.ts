import * as chai from "chai";

import { SizeRule } from "../../source/rules";
import { ActionMock, Accept, Ignore, Reject } from "../action.mock";

const should = chai.should();

describe("SizeRule", () => {

    it("should ignore if value is missing", () => {
        const rule = new SizeRule({});
        const value: any = null;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should ignore if not a number, a string, or an array", () => {
        const rule = new SizeRule({});
        const value: any = {};
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Ignore);
        });
    });

    it("should accept if value satisfies specified targets", () => {
        const rule = new SizeRule({ exactly: 42 });
        const value: any = 42;
        const action = new ActionMock();
        rule.validate("$", value, action);

        return action.check(result => {
            result.should.be.instanceOf(Accept);
        });
    });

    describe("Number", () => {

        it("should reject if a number but not above target.above", () => {
            const rule = new SizeRule({ above: 42 });
            const value: any = 42;
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 42 but should be more than 42']);
            });
        });

        it("should reject if a number but not minimum target.min", () => {
            const rule = new SizeRule({ min: 42 });
            const value: any = 41;
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 41 but should be at least 42']);
            });
        });

        it("should reject if a number but not exactly target.exactly", () => {
            const rule = new SizeRule({ exactly: 42 });
            const value: any = 41;
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 41 but should be 42']);
            });
        });

        it("should reject if a number but not maximum target.max", () => {
            const rule = new SizeRule({ max: 42 });
            const value: any = 43;
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 43 but should be at most 42']);
            });
        });

        it("should reject if a number but not below target.below", () => {
            const rule = new SizeRule({ below: 42 });
            const value: any = 42;
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 42 but should be less than 42']);
            });
        });

    });

    describe("String", () => {

        it("should reject if a string but number of characters is not above target.above", () => {
            const rule = new SizeRule({ above: 4 });
            const value: any = "1234";
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 4 characters long but should be longer than 4']);
            });
        });

        it("should reject if a string but number of characters is not minimum target.min", () => {
            const rule = new SizeRule({ min: 4 });
            const value: any = "123";
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 3 characters long but should be at least 4']);
            });
        });

        it("should reject if a string but number of characters is not exactly target.exactly", () => {
            const rule = new SizeRule({ exactly: 4 });
            const value: any = "123";
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 3 characters long but should be 4']);
            });
        });

        it("should reject if a string but number of characters is not maximum target.max", () => {
            const rule = new SizeRule({ max: 3 });
            const value: any = "1234";
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 4 characters long but should be at most 3']);
            });
        });

        it("should reject if a string but number of characters is not below target.below", () => {
            const rule = new SizeRule({ below: 4 });
            const value: any = "1234";
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" was 4 characters long but should be shorter than 4']);
            });
        });

    });

    describe("Array", () => {

        it("should reject if an array but number of elements is not above target.above", () => {
            const rule = new SizeRule({ above: 3 });
            const value: any = [1, 2, 3];
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" contained 3 elements but should contain more than 3']);
            });
        });

        it("should reject if an array but number of elements is not minimum target.min", () => {
            const rule = new SizeRule({ min: 4 });
            const value: any = [1, 2, 3];
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" contained 3 elements but should contain at least 4']);
            });
        });

        it("should reject if an array but number of elements is not exactly target.exactly", () => {
            const rule = new SizeRule({ exactly: 4 });
            const value: any = [1, 2, 3];
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" contained 3 elements but should contain 4']);
            });
        });

        it("should reject if an array but number of elements is not maximum target.max", () => {
            const rule = new SizeRule({ max: 3 });
            const value: any = [1, 2, 3, 4];
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" contained 4 elements but should contain at most 3']);
            });
        });

        it("should reject if an array but number of elements is not below target.below", () => {
            const rule = new SizeRule({ below: 3 });
            const value: any = [1, 2, 3];
            const action = new ActionMock();
            rule.validate("$", value, action);

            return action.check((result: Reject) => {
                result.should.be.instanceOf(Reject);
                result.messages.should.deep.equal(['"$" contained 3 elements but should contain less than 3']);
            });
        });

    });
});
