class Account {
  owner: string;
  balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance = this.balance + amount;
  }

  withdraw(amount: number): void {
    this.balance = this.balance - amount;
  }
}

const account: Account = new Account("Ada", 100);
account.deposit(50);
account.withdraw(30);

console.log(account.balance);
