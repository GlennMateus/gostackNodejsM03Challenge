import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const income = incomeTransactions.reduce(function (prev, actual) {
      return prev + actual.value;
    }, 0);

    const outcome = outcomeTransactions.reduce(function (prev, actual) {
      return prev + actual.value;
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
