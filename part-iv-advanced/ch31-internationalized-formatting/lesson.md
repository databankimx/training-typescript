# Ch31 - Internationalized formatting

A number, a date, or a list of names looks different depending on where the reader is. In the United States a price is written `$1,234.50`, and in much of Europe the same amount is `1.234,50 €`. Dates, plural words, and lists follow their own rules too. The `Intl` object in JavaScript knows those rules, so a program can format values for a locale without writing the rules by hand.

Every example here names its locale and its time zone, so the output is the same on every computer. A program that leaves either one to the reader's machine can look correct in testing and wrong for a real visitor.

## What you'll learn

1. How to format a number as currency for a named locale.
2. How to format a date, with its time zone fixed in the code.
3. How to choose between singular and plural words, and how to join a list.
4. How to write relative times, such as yesterday or in three days.

The chapter ends with a summary, and a homework exercise.
