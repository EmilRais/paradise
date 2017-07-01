import * as chai from "chai";
const should = chai.should();

import { isBoolean, isNumber, isPresent, isString } from "../source/core";

describe("core", () => {

    describe("isPresent", () => {
        it("should be false if undefined", () => {
            isPresent(undefined).should.be.false;
        });

        it("should be false if null", () => {
            isPresent(null).should.be.false;
        });

        it("should be true if value", () => {
            isPresent(42).should.be.true;
        });

        it("should be true if object", () => {
            isPresent([]).should.be.true;
        });
    });

    describe("isBoolean", () => {
        it("should be false if not a boolean", () => {
            isBoolean("false").should.be.false;
        });

        it("should be true if boolean", () => {
            isBoolean(false).should.be.true;
        });
    });

    describe("isNumber", () => {
        it("should be false if not a number", () => {
            isNumber("some-string").should.be.false;
        });

        it("should be true if number", () => {
            isNumber(42).should.be.true;
        });
    });

    describe("isString", () => {
        it("should be false if not a string", () => {
            isString(42).should.be.false;
        });

        it("should be true if string", () => {
            isString("some-string").should.be.true;
        });
    });
});
