import MarkdownIt from "markdown-it";
import { highlightCode } from "./highlight.ts";
import { parseQuiz, type Quiz } from "./quiz.ts";

// Renders lesson.md. Raw HTML in a lesson is shown as text, not run, so a lesson can't inject markup into the window.
// A fence labelled "quiz" becomes a question with radio buttons (or a text box, for a fill-in question), and the window
// adds the Check, Try again, and Show answer buttons behaviour.

export function createLessonMarkdown(): MarkdownIt {
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
  const defaultFence = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const label = token.info.trim();
    if (label === "quiz") {
      return renderQuiz(parseQuiz(token.content), md);
    }
    // Labels we support get color. Unlabelled blocks, and labels we don't support, are plain text, like program output.
    const colored = label === "" ? undefined : highlightCode(label, token.content);
    if (colored !== undefined) {
      return `<pre><code class="language-${label}">${colored}</code></pre>\n`;
    }
    if (defaultFence !== undefined) {
      return defaultFence(tokens, idx, options, env, self);
    }
    return self.renderToken(tokens, idx, options);
  };

  return md;
}

function renderQuiz(quiz: Quiz, md: MarkdownIt): string {
  const question = `<div class="quiz-question">${md.renderInline(quiz.question)}</div>`;
  const buttons =
    `<div class="quiz-buttons">` +
    `<button type="button" class="quiz-check">Check answer</button>` +
    `<button type="button" class="quiz-retry hidden">Try again</button>` +
    `<button type="button" class="quiz-show link">Show answer</button>` +
    `</div>` +
    `<div class="quiz-feedback" aria-live="polite"></div>`;

  if (quiz.kind === "fill") {
    const explanation = quiz.feedback === undefined ? "" : md.utils.escapeHtml(quiz.feedback);
    return (
      `<div class="quiz quiz-fill" data-answer="${md.utils.escapeHtml(quiz.answer)}" data-explanation="${explanation}">` +
      question +
      `<input type="text" class="quiz-text" placeholder="Type your answer" aria-label="Your answer">` +
      buttons +
      `</div>\n`
    );
  }

  const group = `quiz-${Math.random().toString(36).slice(2)}`;
  const choices = quiz.choices
    .map((choice, index) => {
      const explanation = choice.feedback === undefined ? "" : md.utils.escapeHtml(choice.feedback);
      return (
        `<label class="quiz-choice" data-correct="${choice.correct}" data-explanation="${explanation}">` +
        `<input type="radio" name="${group}" value="${index}">` +
        `<span>${md.renderInline(choice.text)}</span>` +
        `</label>`
      );
    })
    .join("");

  return `<div class="quiz quiz-choice-set">${question}<div class="quiz-choices">${choices}</div>${buttons}</div>\n`;
}
