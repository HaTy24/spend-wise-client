"use client";

import { ReactNode, useEffect, useState } from "react";
import { DebounceInput } from "@/packages/components/form/DebounceInput";
import { transactionService } from "@/packages/services/TransactionService";
import { Transaction } from "@/packages/models/Transaction";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [spendingReason, setSpendingReason] = useState<string>("");

  const getTransactions = async () => {
    const data = await transactionService.getTransactions({
      take: 5,
      skip: 0,
      sort: "date",
    });
  };
  useEffect(() => {
    getTransactions();
  }, []);
  const createTransaction = async (e: any) => {
    e.preventDefault();
    const date = new Date();
    await transactionService.createTransaction(amount, spendingReason, date);
    getTransactions();
  };

  return (
    <main className="container mt-5">
      <form onSubmit={createTransaction}>
        <div className="d-flex gap-5">
          <div className="mb-3 w-50">
            <label htmlFor="amount" className="form-label">
              Số tiền
            </label>
            <DebounceInput
              onChange={(value) => setAmount(value)}
              type="number"
              positiveNumber
              min={1}
            />
          </div>
          <div className="mb-3 w-50">
            <label className="form-label">Lý do chi tiêu</label>
            <select
              className="form-select"
              onChange={(e) => setSpendingReason(e.target.value)}
              defaultValue="Ăn sáng"
            >
              <option value="Ăn sáng">Ăn sáng</option>
              <option value="Ăn Trưa">Ăn Trưa</option>
              <option value="Ăn tối">Ăn tối</option>
              <option value="Xăng">Xăng</option>
              <option value="Đi chơi">Đi chơi</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        {transactions.map((transaction, index) => (
          <ul key={index}>
            <li>{transaction.amount}</li>
            <li>{transaction.purpose}</li>
            <li>{transaction.date as unknown as ReactNode}</li>
          </ul>
        ))}
      </div>
    </main>
  );
}
