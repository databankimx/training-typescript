import { classHighlighter, highlightTree } from "@lezer/highlight";
import { parser as javascriptParser } from "@lezer/javascript";

// The TypeScript grammar is the JavaScript parser with the "ts" dialect turned on.
const typescriptParser = javascriptParser.configure({ dialect: "ts" });

// Colours a code block as HTML. Each token gets a span whose class is one of @lezer/highlight's standard names
// (tok-keyword, tok-string, and so on), so one stylesheet serves every language.
//
// highlightCode returns undefined for a label it doesn't support. The caller shows that block as plain text, the same
// as an unlabelled block, so a label is only coloured when we've chosen to support it.

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function highlightWithParser(parser: typeof javascriptParser, code: string): string {
  const tree = parser.parse(code);
  let html = "";
  let position = 0;

  highlightTree(tree, classHighlighter, (from, to, classes) => {
    if (from > position) {
      html += escapeHtml(code.slice(position, from));
    }
    html += `<span class="${classes}">${escapeHtml(code.slice(from, to))}</span>`;
    position = to;
  });

  if (position < code.length) {
    html += escapeHtml(code.slice(position));
  }
  return html;
}

// PowerShell has no Lezer grammar in our set, so this is a small tokenizer. It covers what the lessons use:
// comments, strings, variables, parameters, keywords, Verb-Noun cmdlet names, and numbers. Anything else is plain text.
const POWERSHELL_TOKEN =
  /(#[^\n]*)|("(?:[^"`\\]|`.|\\.)*"|'[^']*')|(\$\{[^}]*\}|\$[A-Za-z_][\w:]*)|((?<=\s|^)-[A-Za-z][\w-]*)|(\b(?:if|elseif|else|foreach|for|while|do|until|function|param|return|switch|try|catch|finally|throw|break|continue|in|begin|process|end)\b)|([A-Za-z]+-[A-Za-z][\w-]*)|(\b\d+(?:\.\d+)?\b)/g;

const POWERSHELL_CLASSES = [
  "tok-comment",
  "tok-string",
  "tok-variableName",
  "tok-propertyName",
  "tok-keyword",
  "tok-function",
  "tok-number",
];

function highlightPowerShell(code: string): string {
  let html = "";
  let position = 0;

  for (const match of code.matchAll(POWERSHELL_TOKEN)) {
    const start = match.index ?? 0;
    if (start > position) {
      html += escapeHtml(code.slice(position, start));
    }
    const group = match.slice(1).findIndex((text) => text !== undefined);
    const className = POWERSHELL_CLASSES[group];
    html += `<span class="${className}">${escapeHtml(match[0])}</span>`;
    position = start + match[0].length;
  }

  if (position < code.length) {
    html += escapeHtml(code.slice(position));
  }
  return html;
}

export function highlightCode(label: string, code: string): string | undefined {
  switch (label) {
    case "typescript":
    case "ts":
      return highlightWithParser(typescriptParser, code);
    case "javascript":
    case "js":
      return highlightWithParser(javascriptParser, code);
    case "pwsh":
    case "powershell":
      return highlightPowerShell(code);
    default:
      return undefined;
  }
}
