class Account {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance = this.balance + amount;
  }

  withdraw(amount: number): void {
    this.balance = this.balance - amount;
  }

  report(): number {
    return this.balance;
  }
}

const account: Account = new Account(100);
account.deposit(50);
account.withdraw(30);

console.log(account.report());
