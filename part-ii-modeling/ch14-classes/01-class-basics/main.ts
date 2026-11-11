class Account {
  owner: string;
  balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }
}

const account: Account = new Account("Ada", 100);
console.log(`${account.owner} has ${account.balance}`);
