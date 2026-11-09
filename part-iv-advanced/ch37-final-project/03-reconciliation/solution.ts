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

// The GL subtotal must equal the invoice total less tax and freight.
function expectedSubtotal(invoice: Invoice): number {
  return invoice.amountCents - invoice.taxCents - invoice.freightCents;
}

// Returns every problem found. An empty list means the distribution reconciles.
function reconcile(invoice: Invoice, rows: DistributionRow[]): string[] {
  const errors: string[] = [];

  for (const row of rows) {
    if (!activeCodes.has(row.code)) {
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

const invoice: Invoice = { number: "INV-1001", amountCents: 10000, taxCents: 800, freightCents: 200 };

const balanced: DistributionRow[] = [
  { code: "6100", amountCents: 5000 },
  { code: "6200", amountCents: 4000 },
];
console.log(reconcile(invoice, balanced).length === 0 ? "Reconciled: yes" : "Reconciled: no");

const short: DistributionRow[] = [
  { code: "6100", amountCents: 5000 },
  { code: "6200", amountCents: 3900 },
];
const problems: string[] = reconcile(invoice, short);
console.log(problems.length === 0 ? "Reconciled: yes" : `Not reconciled: ${problems.join("; ")}`);
