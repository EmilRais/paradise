import { Rule } from "./models";
import {
    AllRule,
    AnyRule,
    ArrayRule,
    BooleanRule,
    CountryCodeRule,
    CountryRule,
    CurrencyRule,
    DateRule,
    EmailRule,
    MandatoryFieldsRule,
    MultipleRule,
    NotValueRule,
    NumberRule,
    ObjectRule,
    OptionalFieldsRule,
    RecognisedFieldsRule,
    RegexRule,
    RequiredRule,
    SizeRule, SizeTarget,
    StringRule,
    ValueRule,
    Schema
} from "./rules";

export const All = (rules: Rule[]) => new AllRule(rules);
export const Any = (rules: Rule[]) => new AnyRule(rules);
export const Array = (rules?: Rule[]) => new ArrayRule(rules);
export const Boolean = () => new BooleanRule();
export const CountryCode = () => new CountryCodeRule();
export const Country = () => new CountryRule();
export const Currency = () => new CurrencyRule();
export const Date = () => new DateRule();
export const Email = () => new EmailRule();
export const MandatoryFields = (schema: Schema) => new MandatoryFieldsRule(schema);
export const Multiple = (target: number) => new MultipleRule(target);
export const NotValue = (targets: Array<boolean | number | string>) => new NotValueRule(targets);
export const Number = () => new NumberRule();
export const Object = () => new ObjectRule();
export const OptionalFields = (schema: Schema) => new OptionalFieldsRule(schema);
export const RecognisedFields = (fields: string[]) => new RecognisedFieldsRule(fields);
export const Regex = (pattern: RegExp) => new RegexRule(pattern);
export const Required = () => new RequiredRule();
export const Size = (target: SizeTarget) => new SizeRule(target);
export const String = () => new StringRule();
export const Value = (targets: Array<boolean | number | string>) => new ValueRule(targets);
