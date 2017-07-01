# Paradise

A declarative and effective approach to thorough validation.

## Built-in rules:

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
