class BankAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.transactions.push({ type: 'deposit', amount: amount });
            return `Successfully deposited $${amount}. New balance: $${this.balance}`;
        } else {
            return "Deposit amount must be greater than zero.";
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.transactions.push({ type: 'withdraw', amount: amount });
            return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
        } else {
            return "Insufficient balance or invalid amount.";
        }
    }

    checkBalance() {
        return `Current balance: $${this.balance}`;
    }

    listAllDeposits() {
        const deposits = this.transactions.filter(transaction => transaction.type === 'deposit');
        
        return "Deposits: " + deposits.map(deposit => `${deposit.amount}`).join(',');
    }

    listAllWithdrawals() {
        const withdrawals = this.transactions.filter(transaction => transaction.type === 'withdraw');
        
        return "Withdrawals: " + withdrawals.map(withdrawal => `${withdrawal.amount}`).join(',');
    }
}

const myAccount = new BankAccount();
console.log(myAccount.deposit(100));
console.log(myAccount.deposit(3000));
console.log(myAccount.withdraw(500));
console.log(myAccount.deposit(1500));
console.log(myAccount.withdraw(100));

console.log(myAccount.checkBalance());
console.log(myAccount.listAllDeposits());
console.log(myAccount.listAllWithdrawals());

