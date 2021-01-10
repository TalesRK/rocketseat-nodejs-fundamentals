import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto {
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
    const incomes = this.transactions
      .filter(trans => trans.type === 'income')
      .map(trans => trans.value);
    const income =
      incomes.length > 0
        ? incomes.reduce((first, second) => first + second)
        : 0;

    const outcomes = this.transactions
      .filter(trans => trans.type === 'outcome')
      .map(trans => trans.value);

    const outcome =
      outcomes.length > 0
        ? outcomes.reduce((first, second) => first + second)
        : 0;

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
