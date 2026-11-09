type LinkCheck = { ok: true; href: string } | { ok: false; message: string };

function checkLink(text: string): LinkCheck {
  let url: URL;
  try {
    url = new URL(text);
  } catch (error: unknown) {
    return { ok: false, message: "That isn't a web address." };
  }
  if (url.protocol !== "https:") {
    return { ok: false, message: "Only https links are allowed." };
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
