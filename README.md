# Paradise

A declarative and effective approach to thorough validation.

## Built-in rules:

### AllRule
    ✓ ignores when no rules are specified
    ✓ ignores when all rules are ignored
    ✓ rejects when any rule is rejected
    ✓ accepts when any rule is accepted and none are rejected

### AnyRule
    ✓ ignores when no rules are specified
    ✓ ignores when all rules are ignored
    ✓ rejects when any rule is rejected and none are accepted
    ✓ accepts when any rule is accepted

### RequiredRule
    ✓ rejects missing values
    ✓ accepts present values

### ArrayRule
    ✓ ignores missing values
    ✓ rejects values that are not arrays
    ✓ rejects when any contained items are rejected
    ✓ accepts when an array and no contained items are rejected

### ObjectRule
    ✓ ignores missing values
    ✓ rejects values that are not objects
    ✓ accepts when value is an object

### RecognisedFieldsRule
    ✓ ignores missing values
    ✓ ignores values that are not objects
    ✓ rejects if object contains unspecified fields
    ✓ accepts if all fields have been specified

### MandatoryFieldsRule
    ✓ ignores missing values
    ✓ ignores values that are not objects
    ✓ rejects if any fields are missing
    ✓ rejects if any fields are rejected
    ✓ accepts when no fields are rejected

### OptionalFieldsRule
    ✓ ignores missing values
    ✓ ignores values that are not objects
    ✓ ignores missing fields
    ✓ rejects if any fields are rejected
    ✓ accepts when no fields are rejected

### BooleanRule
    ✓ ignores missing values
    ✓ rejects non-boolean values
    ✓ accepts boolean values  

### NumberRule
    ✓ ignores missing values
    ✓ rejects non-numeric values
    ✓ accepts numeric values

### MultipleRule
    ✓ ignore missing values
    ✓ ignores non-numeric values
    ✓ rejects values that are not a multiple of target
    ✓ accepts values that are a multiple of target

### DateRule
    ✓ ignores missing values
    ✓ rejects values that are not dates
    ✓ accepts values that are dates

### StringRule
    ✓ ignores missing values
    ✓ rejects non-string values
    ✓ accepts string values

### EmailRule
    ✓ ignores missing values
    ✓ ignores non-string values
    ✓ rejects values that are not valid email addresses
    ✓ accepts values that are valid email addresses

### RegexRule
    ✓ ignores missing values
    ✓ ignores non-string values
    ✓ rejects values that do not satisfy pattern
    ✓ accepts values that satisfy pattern

### CurrencyRule
    ✓ ignores missing values
    ✓ ignores non-string values
    ✓ rejects values that are not valid currency codes
    ✓ accepts values that are valid currency codes

### CountryRule
    ✓ ignores missing values
    ✓ ignores non-string values
    ✓ rejects values that are not country names
    ✓ accepts values that are valid country names

### CountryCodeRule
    ✓ ignores missing values
    ✓ ignores non-string values
    ✓ rejects values that are not valid two digit country codes
    ✓ accepts values that are valid two digit country codes

### ValueRule
    ✓ ignores missing values
    ✓ ignores values that are neither boolean, number or string
    ✓ rejects values that are not one of the target values
    ✓ accepts values that are one of the target values

### SizeRule
    ✓ ignores missing values
    ✓ ignores values that are neither number, string or array
    ✓ accepts values that satisfy specified targets
    
    ✓ rejects numbers that are not above target.above
    ✓ rejects numbers that are not minimum target.min
    ✓ rejects numbers that are not exactly target.exactly
    ✓ rejects numbers that are not maximum target.max
    ✓ rejects numbers that are not below target.below

    ✓ rejects strings whose lengths are not above target.above
    ✓ rejects strings whose lengths are not minimum target.min
    ✓ rejects strings whose lengths are not exactly target.exactly
    ✓ rejects strings whose lengths are not maximum target.max
    ✓ rejects strings whose lengths are not below target.below

    ✓ rejects arrays whose lengths are not above target.above
    ✓ rejects arrays whose lengths are not minimum target.min
    ✓ rejects arrays whose lengths are not exactly target.exactly
    ✓ rejects arrays whose lengths are not maximum target.max
    ✓ rejects arrays whose lengths are not below target.below
