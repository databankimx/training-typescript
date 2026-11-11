## Summary: Anti-bot strategies

Every defence in this chapter raises the cost of automation, and none of them proves that a person is present.

* **Browser checks are requests, not enforcement.** The visitor controls the computer, so a script can skip the page altogether.
* **A honeypot catches scripts that fill every field.** Reply neutrally, so the trap stays hidden.
* **A timing check flags submissions that arrive too fast.** It measures time since the page opened, which a patient bot can match.
* **A challenge asks a question, and a script can read the question.** Its value is the friction it adds, and the cost it places on real visitors.
* **Server-side limits enforce the rules that matter.** Rate limits and verified answers belong on the server.
* **Order the checks by cost, and reply quietly except where a person needs to know.**

### Check your understanding

*These questions are written for this course.*

```quiz
Why is a honeypot kept off-screen rather than removed from the page?
○ Because removing a field makes the form invalid.
→ Not quite. A missing field does not invalidate a form.
◉ Because the bot must see the field to fill it, and a person must never see it.
→ Right. The field has to exist in the page for the trap to work.
○ Because off-screen fields are faster.
→ Not quite. Speed is not the reason.
```

```quiz
Why does a timing check fail to identify a patient bot?
○ Because timing checks cannot read the clock.
→ Not quite. The clock is read correctly. The problem is what it measures.
◉ Because it measures time since the page opened, and a bot can wait as long as it likes.
→ Right. The check raises the cost of automation, but it does not identify anyone.
○ Because bots never submit forms slowly.
→ Not quite. Bots can submit slowly, and many do.
```

```quiz
Which rule must the server enforce rather than the page?
○ The colour of the form.
→ Not quite. Visual design is not a security rule.
◉ The rate limit, because the page can simply skip it.
→ Right. A limit enforced only in the page is a suggestion to the visitor.
○ The text of the thanks message.
→ Not quite. The message is not a rule.
```
