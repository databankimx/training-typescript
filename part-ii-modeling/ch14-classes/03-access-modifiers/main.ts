class Account {
  readonly owner: string;
  private balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance = this.balance + amount;
  }

  report(): string {
    return `${this.owner}: ${this.balance}`;
  }
}

const account: Account = new Account("Ada", 100);
account.deposit(25);
console.log(account.report());
