export {};

// The shape of what the browser sends. The clientId is whatever the page says it is, which is why it cannot be trusted alone.
interface ServerRequest {
  clientId: string;
  comment: string;
}

interface ServerReply {
  accepted: boolean;
  reason: string;
}

// The server. It keeps its own records, and it does not believe what the browser says beyond the request itself.
const server = {
  windowMilliseconds: 10000,
  limit: 3,
  recentByClient: {} as Record<string, number[]>,

  handle(request: ServerRequest): ServerReply {
    const now: number = Date.now();
    const recent: number[] = (this.recentByClient[request.clientId] ?? []).filter(
      (time: number) => now - time < this.windowMilliseconds,
    );
    recent.push(now);
    this.recentByClient[request.clientId] = recent;

    // Counted before the content is checked, so a flood of empty requests is still limited.
    if (recent.length > this.limit) {
      return { accepted: false, reason: "Too many requests. Wait and try again." };
    }
    if (request.comment.trim() === "") {
      return { accepted: false, reason: "The comment was empty." };
    }
    return { accepted: true, reason: "Comment saved." };
  },
};

const comment = document.querySelector<HTMLTextAreaElement>("#comment");
const personButton = document.querySelector<HTMLButtonElement>("#person");
const botButton = document.querySelector<HTMLButtonElement>("#bot");
const status = document.querySelector<HTMLParagraphElement>("#status");
const log = document.querySelector<HTMLOListElement>("#log");

if (comment !== null && personButton !== null && botButton !== null && status !== null && log !== null) {
  // The browser sends a request, then shows whatever the server replied.
  const send = (clientId: string, text: string): ServerReply => {
    const reply: ServerReply = server.handle({ clientId, comment: text });
    const entry = document.createElement("li");
    entry.textContent = reply.reason;
    log.append(entry);
    return reply;
  };

  personButton.addEventListener("click", () => {
    const reply: ServerReply = send("ada-browser", comment.value);
    status.textContent = reply.accepted ? "Saved." : reply.reason;
    if (reply.accepted) {
      comment.value = "";
    }
  });

  // Five requests in a row from one client. The server accepts three, then starts refusing.
  botButton.addEventListener("click", () => {
    let last: ServerReply = { accepted: false, reason: "" };
    for (let attempt: number = 0; attempt < 5; attempt++) {
      last = send("bot-1", "Cheap watches, click here");
    }
    status.textContent = last.reason;
  });
}
