# Ch24 - Anti-bot strategies

Every public form attracts automated traffic. Some of it is spam, some is a script trying a thousand passwords, and some is a crawler that never meant to submit anything at all. Defending against it is a matter of making automation more expensive than the reward, while keeping the form pleasant for the people who actually use it.

This chapter builds the common defences, one at a time: a honeypot field, a timing check, an arithmetic challenge, server-side limits, and a form that combines them. Each one is a small piece of TypeScript, and each one has a weakness that the next one partly covers. The lessons are honest about those weaknesses, because a defence you overrate is worse than no defence at all.

These lessons are page steps, as in the last few chapters. Press **Run** to open the page in its own window.

## What you'll learn

1. Why a check that runs in the browser cannot prove that a person sent the data.
2. How a honeypot field and a timing check catch simple automation without a visible prompt.
3. How a challenge asks a question and checks the answer, and why its limits matter.
4. How server-side limits enforce rules that the browser can skip.
5. How to combine the checks in a sensible order, and how to keep them accessible.

The chapter ends with a summary, and two homework exercises.
