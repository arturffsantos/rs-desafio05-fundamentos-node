import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const { income, outcome } = this.transactions.reduce(
      (balance, transaction) => {
        return transaction.type === 'income'
          ? {
              income: balance.income + transaction.value,
              outcome: balance.outcome,
            }
          : {
              income: balance.income,
              outcome: balance.outcome + transaction.value,
            };
      },
      { income: 0, outcome: 0 },
    );

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
