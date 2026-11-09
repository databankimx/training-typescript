// The active GL codes and their descriptions. ReadonlyMap means the program never adds or removes codes at run time.
const activeCodes: ReadonlyMap<string, string> = new Map<string, string>([
  ["6100", "Office supplies"],
  ["6200", "Professional services"],
  ["6300", "Facilities and maintenance"],
  ["6400", "Travel and lodging"],
]);

// A result is either a description or a reason. The ok field tells the caller which one it has.
type LookupResult = { ok: true; description: string } | { ok: false; reason: string };

function lookupGlCode(code: string): LookupResult {
  const description: string | undefined = activeCodes.get(code);
  if (description === undefined) {
    return { ok: false, reason: "not an active GL code" };
  }
  return { ok: true, description };
}

// Narrowing on ok gives each branch the fields that exist in it.
function describe(code: string): string {
  const result: LookupResult = lookupGlCode(code);
  return result.ok ? `${code}: ${result.description}` : `${code}: ${result.reason}`;
}

console.log(describe("6100"));
console.log(describe("9999"));
