export {};

type LinkCheck = { ok: true; href: string } | { ok: false; message: string };

// Accepts an address only when it parses as a URL and uses http or https. Anything else, including javascript: links,
// is refused with a message the learner can read.
function checkLink(text: string): LinkCheck {
  let url: URL;
  try {
    url = new URL(text);
  } catch (error: unknown) {
    return { ok: false, message: "That isn't a web address." };
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return { ok: false, message: "Only http and https links are allowed." };
  }
  return { ok: true, href: url.href };
}

const address = document.querySelector<HTMLInputElement>("#address");
const status = document.querySelector<HTMLParagraphElement>("#status");
const open = document.querySelector<HTMLAnchorElement>("#open");

function show(input: HTMLInputElement, message: HTMLParagraphElement, link: HTMLAnchorElement): void {
  const result = checkLink(input.value);
  if (result.ok) {
    message.textContent = `Safe link: ${result.href}`;
    link.href = result.href;
  } else {
    message.textContent = result.message;
    link.removeAttribute("href");
  }
}

if (address !== null && status !== null && open !== null) {
  show(address, status, open);
  address.addEventListener("input", () => {
    show(address, status, open);
  });
}
