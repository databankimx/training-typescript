import MarkdownIt from "markdown-it";
import { highlightCode } from "./highlight.ts";
import { parseQuiz, type Quiz } from "./quiz.ts";

// Renders lesson.md. Raw HTML in a lesson is shown as text, not run, so a lesson can't inject markup into the window.
// A fence labelled "quiz" becomes an interactive-ready quiz, built from the parsed question and choices.

export function createLessonMarkdown(): MarkdownIt {
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
  const defaultFence = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const label = token.info.trim();
    if (label === "quiz") {
      return renderQuiz(parseQuiz(token.content), md);
    }
    // Labels we support get colour. Unlabelled blocks, and labels we don't support, are plain text, like program output.
    const coloured = label === "" ? undefined : highlightCode(label, token.content);
    if (coloured !== undefined) {
      return `<pre><code class="language-${label}">${coloured}</code></pre>\n`;
    }
    if (defaultFence !== undefined) {
      return defaultFence(tokens, idx, options, env, self);
    }
    return self.renderToken(tokens, idx, options);
  };

  return md;
}

function renderQuiz(quiz: Quiz, md: MarkdownIt): string {
  const question = md.renderInline(quiz.question);

  if (quiz.kind === "fill") {
    const feedback =
      quiz.feedback === undefined ? "" : `<p class="quiz-feedback" hidden>${md.utils.escapeHtml(quiz.feedback)}</p>`;
    return (
      `<div class="quiz quiz-fill">` +
      `<p class="quiz-question">${question}</p>` +
      `<label class="quiz-entry">Your answer <input type="text" data-answer="${md.utils.escapeHtml(quiz.answer)}"></label>` +
      feedback +
      `</div>\n`
    );
  }

  const items = quiz.choices
    .map((choice) => {
      const feedback =
        choice.feedback === undefined
          ? ""
          : `<span class="quiz-feedback" hidden>${md.utils.escapeHtml(choice.feedback)}</span>`;
      return (
        `<li class="quiz-choice" data-correct="${choice.correct}">` +
        `<button type="button">${md.renderInline(choice.text)}</button>` +
        feedback +
        `</li>`
      );
    })
    .join("");

  return `<div class="quiz quiz-choice-set"><p class="quiz-question">${question}</p><ul>${items}</ul></div>\n`;
}
