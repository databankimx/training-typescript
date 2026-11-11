# Server-side limits

Every check so far has lived in the page, and we have said repeatedly that the page is not a barrier. This step acts on that. A rate limit, a record of what has been accepted, and a verified challenge answer belong on the server, where the visitor cannot change them.

This lesson has no real server, so the script plays the server's part. The `server` object is the part that would run far away, and everything else is the page talking to it.

> **Coming from JavaScript:** the object with its method is ordinary JavaScript. The `ServerRequest` and `ServerReply` interfaces are the TypeScript part, and they make the contract between the page and the server explicit.

## Describe the contract

The request and the reply have named shapes, so a mistake in either is reported where it is written:

```typescript
interface ServerRequest {
  clientId: string;
  comment: string;
}

interface ServerReply {
  accepted: boolean;
  reason: string;
}
```

## A rate limit on the server

The rule is no more than three requests from one client in ten seconds. The server keeps the times of recent requests and drops the old ones:

```typescript
const recent: number[] = (this.recentByClient[request.clientId] ?? []).filter(
  (time: number) => now - time < this.windowMilliseconds,
);
recent.push(now);
this.recentByClient[request.clientId] = recent;

if (recent.length > this.limit) {
  return { accepted: false, reason: "Too many requests. Wait and try again." };
}
```

Press **Send as a bot (five times)**. The first three are saved and the last two are refused:

```text
Too many requests. Wait and try again.
```

## Who is the client?

The `clientId` comes from the page, and the page can send any value it likes. A real server identifies clients by something the browser cannot freely choose, such as the connection's address or a session the server issued. Even those can be faked with enough addresses, which is why a sudden spike from many places is a signal to watch, not just a count to limit.

## What must move to the server

- **The rate limit**, because the page can skip it.
- **The challenge answer**, because the page holds the expected value.
- **The honeypot and timing checks**, because the browser can skip them or rewrite the timestamp.
- **The record of accepted comments**, so a replayed request cannot be counted twice.

## Try it

- Press Send as a person with an empty comment, then with some text. Which one reaches the content check, and why does the order of the checks matter?
- Change `limit` to `1`, then press the bot button. How many comments are saved?

## Quiz

```quiz
Why does the server count the request before it checks the comment's content?
○ Because counting is faster than checking content.
→ Not quite. Speed is not the reason.
◉ So a flood of empty requests is still counted and limited, rather than passing for free.
→ Right. A request that is refused for content still uses up the client's allowance.
○ Because the comment must be counted to be saved.
→ Not quite. Saving and counting are separate.
```

```quiz
What does the `clientId` in `ServerRequest` prove?
○ That the request really came from the visitor's own computer.
→ Not quite. The page chooses the `clientId`, so it proves nothing by itself.
◉ Nothing reliable on its own, since the page can send any value.
→ Right. An identifier the browser supplies must not be trusted without a stronger check.
○ That the comment is safe to show to other visitors.
→ Not quite. It identifies a client, not the content.
```
