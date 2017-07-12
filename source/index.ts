import { Rule } from "./core";
import { Schema } from "./rules/object.rule";

import {
    AllRule,
    AnyRule,
    ArrayRule,
    BooleanRule,
    CountryCodeRule,
    CurrencyRule,
    DateRule,
    EmailRule,
    MultipleRule,
    NumberRule,
    ObjectRule,
    RegexRule,
    RequiredRule,
    StringRule
} from "./rules";

export const All = (rules: Rule[]) => new AllRule(rules);
export const Any = (rules: Rule[]) => new AnyRule(rules);
export const Array = (rules?: Rule[]) => new ArrayRule(rules);
export const Boolean = () => new BooleanRule();
export const CountryCode = () => new CountryCodeRule();
export const Currency = () => new CurrencyRule();
export const Date = () => new DateRule();
export const Email = () => new EmailRule();
export const Multiple = (target: number) => new MultipleRule(target);
export const Number = () => new NumberRule();
export const Object = (schema?: Schema) => new ObjectRule(schema);
export const Regex = (pattern: RegExp) => new RegexRule(pattern);
export const Required = () => new RequiredRule();
export const String = () => new StringRule();
