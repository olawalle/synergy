import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionCard from "../components/TransactionCard";

test("loads and displays transaction card", async () => {
  const prop = {
    amount: 1000,
    date: "2024-10-01",
    id: "Tnx-1",
    status: "completed",
  };
  render(<TransactionCard transaction={prop} />);

  // ASSERT
  const paragraphs = screen.getAllByRole("paragraph");

  expect(screen.getByRole("heading")).toHaveTextContent(`${prop.id}`);
  expect(screen.getByTestId(`status-${prop.status}`)).toBeVisible()
  expect(paragraphs[0]).toHaveTextContent(`$1,000`);
  expect(paragraphs[1]).toHaveTextContent(`01 Oct, 2024`);
});
