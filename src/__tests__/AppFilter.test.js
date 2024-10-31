import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AppFilter from "../components/AppFilter";

describe("AppFilter Component", () => {
  const setSearchValue = jest.fn();
  const setDateRange = jest.fn();
  const setStatus = jest.fn();

  beforeEach(() => {
    render(
      <AppFilter
        searchValue=""
        setSearchValue={setSearchValue}
        dateRange={[]}
        setDateRange={setDateRange}
        status=""
        setStatus={setStatus}
      />
    );
  });

  test("renders input and select elements", () => {
    expect(
      screen.getByPlaceholderText("search tnx id or amount")
    ).toBeInTheDocument();

    expect(screen.getByTestId("filter-select")).toBeVisible();
  });

  test("updates input value on change", async () => {
    const input = screen.getByPlaceholderText("search tnx id or amount");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
    await waitFor(() => {
      expect(setSearchValue).toHaveBeenCalledWith("test");
    });
    expect(setSearchValue).toHaveBeenCalledWith("test");
  });

  test("calls clearFilters on button click", () => {
    const clearButton = screen.getByText("clear");
    fireEvent.click(clearButton);
    expect(setSearchValue).toHaveBeenCalledWith("");
    expect(setDateRange).toHaveBeenCalledWith([]);
    expect(setStatus).toHaveBeenCalledWith("");
  });
});
