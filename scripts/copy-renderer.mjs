// Copies the window's page, its logo, and the title bar icon into the build output, next to the compiled renderer
// script. This is build plumbing, so it's plain JavaScript and runs under Node directly.
import { cpSync, existsSync, mkdirSync } from "node:fs";

mkdirSync("lesson-runner/dist/renderer", { recursive: true });
for (const file of ["index.html", "logo.svg"]) {
  cpSync(`lesson-runner/src/renderer/${file}`, `lesson-runner/dist/renderer/${file}`);
}

// The title bar icon is made from the blue D (Icon_Blue.svg). If it hasn't been made yet, the window opens without one.
const icon = "lesson-runner/src/renderer/app.png";
if (existsSync(icon)) {
  cpSync(icon, "lesson-runner/dist/renderer/app.png");
  console.log("Copied the window's page, logo, and title bar icon into lesson-runner/dist/renderer.");
} else {
  console.log("Copied the window's page and logo. There is no app.png yet, so the window will have no title bar icon.");
}
