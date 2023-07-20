export type Transaction = {
  id: string;
  amount: number;
  spendingReason?: string;
  date: Date;
};
