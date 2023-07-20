"use client";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Pagination } from "@/packages/components/Pagination";
import { FormInput } from "@/packages/components/form/FormInput";
import { DataTable } from "@/packages/components/table/DataTable";
import { Transaction } from "@/packages/models/Transaction";
import { DEFAULT_PAGE_INDEX, DEFAULT_TAKE } from "@/packages/models/contants";
import { transactionService } from "@/packages/services/TransactionService";
import { FormSelect } from "@/packages/components/form/FormSelect";
import { Button } from "@/packages/components/form/Button";

const validationSchema = Yup.object().shape({
  amount: Yup.number().min(1, "Too Short!").required("Required"),
});

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [pageIndex, setPageIndex] = useState<number>(DEFAULT_PAGE_INDEX);

  const formik = useFormik({
    initialValues: {
      amount: 0,
      purpose: "test",
      date: new Date(),
    },
    validationSchema,
    onSubmit: async ({ amount, purpose, date }) => {
      await transactionService.createTransaction(amount, purpose, date);
      getTransactions();
    },
  });

  const getTransactions = async () => {
    const data = await transactionService.getTransactions({
      take: DEFAULT_TAKE,
      skip: pageIndex * DEFAULT_TAKE,
      sort: "date",
    });
    setTransactions(data.transaction.result);
    setTotalCount(data.transaction.count);
  };
  useEffect(() => {
    getTransactions();
  }, [pageIndex]);

  const deleteTransaction = async (id: string) => {
    await transactionService.deleteTransaction(id);
    getTransactions();
  };

  const columns = [
    { label: "#", value: "" },
    { label: "Số tiền", value: "amount" },
    { label: "Lý do chi tiêu", value: "purpose" },
    { label: "Ngày chi", value: "date" },
  ];

  return (
    <main className="container mt-3">
      <form className="mb-3" onSubmit={formik.handleSubmit}>
        <div className="d-md-flex gap-5">
          <div className="mb-3 w-100">
            <FormInput
              id="amount"
              name="amount"
              label="Số tiền"
              value={formik.values.amount}
              handleChange={formik.handleChange}
              debounce
              min={1}
              type="number"
              positiveNumber
              error={formik.errors.amount}
            />
          </div>
          <div className="mb-3 w-100">
            <FormSelect
              id="purpose"
              name="purpose"
              label="Lý do chi tiêu"
              value={formik.values.purpose}
              handleChange={formik.handleChange}
              options={[{ label: "test", value: "test" }]}
            />
          </div>
          <div className="mb-3 w-100">
            <FormInput
              id="date"
              name="date"
              label="Ngày chi tiêu"
              value={formik.values.date}
              handleChange={formik.handleChange}
              type="date"
            />
          </div>
        </div>
        <Button
          text="Thêm"
          type="submit"
          isSubmitting={formik.isSubmitting}
          disable={
            !formik.dirty ||
            formik.isSubmitting ||
            Object.values(formik.errors).length > 0
          }
        />
      </form>
      <DataTable
        columns={columns}
        data={transactions}
        actions={["delete"]}
        onDelete={deleteTransaction}
      />
      <div className="d-flex justify-content-end">
        <Pagination
          totalPages={Math.ceil(totalCount / DEFAULT_TAKE)}
          pageIndex={pageIndex}
          onChange={(value) => setPageIndex(value)}
        />
      </div>
    </main>
  );
}
