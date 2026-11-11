import ts from "typescript";

// Turns one TypeScript file into JavaScript that a browser can load as a module. Relative imports are rewritten from
// .ts to .js, so a page that imports "./helper.ts" loads the compiled helper.js beside it.
export function transpileForBrowser(source: string): string {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2023,
      module: ts.ModuleKind.ES2022,
      verbatimModuleSyntax: true,
      rewriteRelativeImportExtensions: true,
    },
  });
  return result.outputText;
}
