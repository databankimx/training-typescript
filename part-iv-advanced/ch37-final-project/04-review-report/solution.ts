// Shared pieces from the earlier steps, repeated here so this file runs on its own.
function formatCents(cents: number): string {
  const dollars: number = Math.floor(cents / 100);
  const remainder: number = cents % 100;
  return `$${dollars}.${String(remainder).padStart(2, "0")}`;
}

const activeCodes: ReadonlyMap<string, string> = new Map<string, string>([
  ["6100", "Office supplies"],
  ["6200", "Professional services"],
  ["6300", "Facilities and maintenance"],
  ["6400", "Travel and lodging"],
]);

type LookupResult = { ok: true; description: string } | { ok: false; reason: string };

function lookupGlCode(code: string): LookupResult {
  const description: string | undefined = activeCodes.get(code);
  if (description === undefined) {
    return { ok: false, reason: "not an active GL code" };
  }
  return { ok: true, description };
}

interface Invoice {
  number: string;
  amountCents: number;
  taxCents: number;
  freightCents: number;
}

interface DistributionRow {
  code: string;
  amountCents: number;
}

function expectedSubtotal(invoice: Invoice): number {
  return invoice.amountCents - invoice.taxCents - invoice.freightCents;
}

function reconcile(invoice: Invoice, rows: DistributionRow[]): string[] {
  const errors: string[] = [];
  for (const row of rows) {
    if (lookupGlCode(row.code).ok === false) {
      errors.push(`${row.code} is not an active GL code`);
    }
    if (row.amountCents <= 0) {
      errors.push(`${row.code} needs a positive amount`);
    }
  }
  const subtotal: number = rows.reduce((sum: number, row: DistributionRow): number => sum + row.amountCents, 0);
  const expected: number = expectedSubtotal(invoice);
  if (subtotal !== expected) {
    errors.push(`GL subtotal must equal ${formatCents(expected)} after tax and freight`);
  }
  return errors;
}

// Builds the review as plain lines of text. Notes are data, so they are printed as text and never treated as markup.
function buildReport(invoice: Invoice, rows: DistributionRow[], notes: string[]): string[] {
  const lines: string[] = [];
  lines.push(`Invoice ${invoice.number}`);
  lines.push(`Invoice total: ${formatCents(invoice.amountCents)}`);

  for (const row of rows) {
    const lookup: LookupResult = lookupGlCode(row.code);
    const label: string = lookup.ok ? lookup.description : "unknown code";
    lines.push(`  ${row.code}  ${label}  ${formatCents(row.amountCents)}`);
  }

  if (notes.length === 0) {
    lines.push("Notes: none");
  } else {
    for (const note of notes) {
      lines.push(`Note: ${note}`);
    }
  }

  const errors: string[] = reconcile(invoice, rows);
  lines.push(errors.length === 0 ? "Status: ready to submit" : `Status: needs correction (${errors.length} problem(s))`);
  return lines;
}

const invoice: Invoice = { number: "INV-1001", amountCents: 10000, taxCents: 800, freightCents: 200 };
const rows: DistributionRow[] = [
  { code: "6100", amountCents: 5000 },
  { code: "6200", amountCents: 4000 },
];

for (const line of buildReport(invoice, rows, [])) {
  console.log(line);
}
