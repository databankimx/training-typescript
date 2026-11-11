# Ch37 - Final project

This chapter brings the course together in one program. The task is a GL distribution checker, the kind of tool an accounts team uses before an invoice is paid. Each invoice has a total, a tax amount, and a freight charge. Its general-ledger distribution is a set of rows, each with a code and an amount, and the rows must add up to the invoice total after tax and freight. The checker looks up each code, rejects anything inactive, and reports whether the distribution reconciles.

The project uses ideas from almost every chapter: typed values, narrowing, objects, arrays and reduce, functions, a result type that forces callers to handle failure, and string formatting. Money is kept in whole cents, because binary decimals cannot represent every amount exactly, and a total that is a few fractions of a cent out is still a failed reconciliation.

The project is built in four steps, and each step adds one piece to the same checker. The chapter ends with a summary. Because the whole chapter is the project, there is no separate homework exercise.

## What you'll build

1. Money in whole cents, with conversion to and from text.
2. A list of active GL codes, and a lookup that returns a result the caller must check.
3. A reconciliation that checks each row and the total.
4. A review report that brings the invoice, its rows, its notes, and its status together.
