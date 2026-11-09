# Ch27 - Regular expressions

Some text has a shape rather than a fixed value. A postal code has two letters and four digits, an order reference has a prefix and a number, and a date has three parts separated by hyphens. A regular expression describes a shape, and the engine checks text against it, finds shapes inside longer text, and replaces them. The notation looks cryptic at first, and it is worth learning, because it appears in nearly every text-handling program.

The checker supports regular expressions fully. The type `RegExp` describes the pattern, and the result types of its methods say whether a match exists, what it captured, and where it is.

## What you'll learn

1. How a pattern tests whether text contains a match.
2. How character classes and quantifiers describe the shape of a value.
3. How groups capture the parts of a match, and how typed destructuring reads them.
4. How to find every match in a longer text.
5. How to validate input, and how to replace matched text.

The chapter ends with a summary, and a homework exercise.
