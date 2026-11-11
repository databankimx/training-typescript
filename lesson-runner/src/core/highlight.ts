import { classHighlighter, highlightTree } from "@lezer/highlight";
import { parser as javascriptParser } from "@lezer/javascript";

// The TypeScript grammar is the JavaScript parser with the "ts" dialect turned on.
const typescriptParser = javascriptParser.configure({ dialect: "ts" });

// Colors a code block as HTML. Each token gets a span whose class is one of @lezer/highlight's standard names
// (tok-keyword, tok-string, and so on), so one stylesheet serves every language.
//
// highlightCode returns undefined for a label it doesn't support. The caller shows that block as plain text, the same
// as an unlabelled block, so a label is only colored when we've chosen to support it.

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

// Several languages have no Lezer grammar in our set, so each has a small tokenizer. A tokenizer is one regular
// expression with a group per token kind, and classes gives the class for each group, in order. Text that matches no
// group is shown as plain text.
function highlightByPattern(code: string, pattern: RegExp, classes: string[]): string {
  let html = "";
  let position = 0;

  for (const match of code.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > position) {
      html += escapeHtml(code.slice(position, start));
    }
    const group = match.slice(1).findIndex((text) => text !== undefined);
    const className = classes[group];
    const text = escapeHtml(match[0]);
    html += className === undefined ? text : `<span class="${className}">${text}</span>`;
    position = start + match[0].length;
  }

  if (position < code.length) {
    html += escapeHtml(code.slice(position));
  }
  return html;
}

// PowerShell: comments, strings, variables, parameters, keywords, Verb-Noun cmdlet names, and numbers.
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

// HTML: comments, the doctype, tag names, attribute names, and quoted attribute values. Text between tags is plain.
const HTML_TOKEN =
  /(<!--[\s\S]*?-->)|(<!doctype[^>]*>)|(<\/?[a-z][\w-]*)|((?<=\s)[a-z_:][\w:.-]*(?=\s*=))|("[^"\n]*"|'[^'\n]*')/gi;

const HTML_CLASSES = ["tok-comment", "tok-keyword", "tok-keyword", "tok-propertyName", "tok-string"];

// CSS: comments, strings, colors, selectors, property names, and numbers with their units.
const CSS_TOKEN =
  /(\/\*[\s\S]*?\*\/)|("[^"\n]*"|'[^'\n]*')|(#[0-9a-f]{3,8}\b)|((?<=[{;]\s*)[a-z-]+(?=\s*:))|([^{};\n/*]+(?=\s*\{))|((?<![\w#.-])-?\d*\.?\d+(?:px|rem|em|%|vh|vw|ms|s)?(?![\w-]))/gi;

const CSS_CLASSES = ["tok-comment", "tok-string", "tok-number", "tok-propertyName", "tok-typeName", "tok-number"];

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
      return highlightByPattern(code, POWERSHELL_TOKEN, POWERSHELL_CLASSES);
    case "html":
      return highlightByPattern(code, HTML_TOKEN, HTML_CLASSES);
    case "css":
      return highlightByPattern(code, CSS_TOKEN, CSS_CLASSES);
    case "plain":
      return escapeHtml(code);
    default:
      return undefined;
  }
}
