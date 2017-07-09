# Paradise

A declarative and effective approach to thorough validation.

## Built-in rules:

### AllRule
    ✓ ignores when no rules are specified
    ✓ ignores when all rules are ignored
    ✓ rejects when any rule is rejected
    ✓ accepts when any rule is accepted and none are rejected

### RequiredRule
    ✓ rejects missing values
    ✓ accepts present values

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