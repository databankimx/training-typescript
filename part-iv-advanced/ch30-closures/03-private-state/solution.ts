// The balance is a local variable. The object's methods are the only code that can reach it.
function createAccount(opening: number) {
  let balance: number = opening;
  return {
    deposit(amount: number): void {
      balance += amount;
    },
    current(): number {
      return balance;
    },
  };
}

const account = createAccount(100);
account.deposit(50);
console.log(account.current());
