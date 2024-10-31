import { Tag } from "antd";
import dayjs from "dayjs";
import React from "react";

const TransactionCard = ({ transaction }) => {
  const { status } = transaction;
  return (
    <div className="bg-white border-[1px] border-[#eeeeee] rounded-lg p-4 h-[130px]">
      <div className="flex justify-between">
        <h3 className="text-[12px] font-semibold">{transaction.id}</h3>
        <Tag
          data-testid={`status-${status}`}
          color={
            status === "completed"
              ? "green"
              : status === "pending"
              ? "orange"
              : "red"
          }
          key={status}
          className="!m-0 !text-[8px]"
        >
          {status.toUpperCase()}
        </Tag>
      </div>
      <div className="flex justify-between items-baseline mt-[30px]">
        <p className="text-gray-700 text-[30px] font-semibold mb-0">
          ${Number(transaction.amount).toLocaleString()}
        </p>
        <p className="text-[#919191] mb-0 text-[12px]">
          {dayjs(transaction.date).format("DD MMM, YYYY")}
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
