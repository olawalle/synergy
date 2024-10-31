import React, { useMemo, useState } from "react";

import { Alert, Empty, Pagination } from "antd";
import dayjs from "dayjs";
import TransactionCard from "../components/TransactionCard";
import useAppState from "../hooks/appState";
import AppFilter from "../components/AppFilter";
import { LoadingOutlined } from "@ant-design/icons";

function DashboardHome(props) {
  const { transactions, loading, error } = useAppState();

  const PAGE_SIZE = 9;
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [status, setStatus] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction?.id
          ?.toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        transaction.amount
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      const matchesDate =
        dateRange?.length === 0 ||
        (dayjs(transaction.date).isAfter(dateRange[0]) &&
          dayjs(transaction.date).isBefore(dateRange[1]));
      const matchesStatus = !status || transaction.status === status;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [transactions, dateRange, searchValue, status]);

  const paginatedList = useMemo(() => {
    return filteredTransactions.slice((page - 1) * PAGE_SIZE, PAGE_SIZE * page);
  }, [page, filteredTransactions]);

  if (error) {
    return (
      <div className="px-4 md:px-[120px]">
        <Alert
          type="error"
          description="An error occured while fetching the transactions"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-4 md:px-[120px] flex items-center justify-center h-[350px] w-full text-[16px] text-[#929292]">
        <p className="mr-4">Loading</p>
        <LoadingOutlined />
      </div>
    );
  }

  return (
    <div className="relative h-full px-4 md:px-[120px] overflow-y-auto">
      <AppFilter
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        dateRange={dateRange}
        setDateRange={setDateRange}
        status={status}
        setStatus={setStatus}
      />
      {paginatedList.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[50px] min-h-[430px]">
          {paginatedList.map((tnx, i) => (
            <TransactionCard transaction={tnx} key={i} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center">
          <Empty description="No transactions" />
        </div>
      )}

      {!!transactions.length && (
        <div className="flex justify-end mt-[30px] mb-[30px] w-full right-[120px]">
          <Pagination
            defaultCurrent={page}
            pageSize={PAGE_SIZE}
            total={transactions.length}
            onChange={(e) => setPage(e)}
          />
        </div>
      )}
    </div>
  );
}

export default DashboardHome;
