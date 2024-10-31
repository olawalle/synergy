import { Button, DatePicker, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

function AppFilter({
  searchValue,
  setSearchValue,
  dateRange,
  setDateRange,
  status,
  setStatus,
}) {
  const [inputValue, setInputValue] = useState(searchValue);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchValue(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchValue]);

  const clearFilters = () => {
    setSearchValue("");
    setDateRange([]);
    setStatus("");
    setInputValue("");
  };

  return (
    <div className="flex flex-wrap justify-end gap-4 mb-4">
      <div className="gap-4 md:w-[350px] w-full flex">
        <Input
          className="w-full md:w-[200px]"
          placeholder="search tnx id or amount"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Select
          data-testid="filter-select"
          className="w-full md:w-[150px]"
          placeholder="Status"
          value={status}
          onChange={(value) => setStatus(value)}
          options={[
            {
              label: "All status",
              value: "",
            },
            {
              label: "Completed",
              value: "completed",
            },
            {
              label: "Pending",
              value: "pending",
            },
            {
              label: "Failed",
              value: "failed",
            },
          ]}
        />
      </div>
      <DatePicker.RangePicker
        value={dateRange}
        onChange={(dates) => setDateRange(dates)}
        className="w-full md:w-[200px]"
        allowClear={false}
      />
      <Button type="primary" onClick={clearFilters}>
        clear
      </Button>
    </div>
  );
}

export default AppFilter;
