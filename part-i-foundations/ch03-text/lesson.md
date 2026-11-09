# Ch03 - Text

Most programs spend their lives handling text: names, messages, file paths, and the things people type into forms, usually with a stray space at one end. This chapter is about building text, tidying it up, and finding things inside it, which is a surprising share of what software does.

Most programs work with text: names, messages, file paths, and the words a user types into a form. In TypeScript, text has the type `string`, and this chapter shows how to build it, change it, search it, and cut pieces out of it.

Text is the first kind of value you'll use in many different ways, so it's a good place to see how a type shapes what you can do with a value. A `string` can be joined, searched, and trimmed. It can't be multiplied, and the checker will tell you when you try.

## What you'll learn

1. What text is, and how to store it in a value.
2. How to join text together, and how to build a sentence from values.
3. How to change text's case, and remove the spaces around it.
4. How to search text for a word or a position.
5. How to cut out a piece of text, and how to write characters that are hard to type, such as a new line.
6. How to replace, split, repeat, and pad text, and how to keep backslashes exactly as you typed them.

The chapter ends with a summary, and two homework exercises that combine the steps.
