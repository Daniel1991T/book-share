// SearchResult.test.tsx
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import SearchResult from "./SearchResult";
import { getBookByName } from "@/lib/actions/book.actions";

jest.mock("@/lib/actions/book.actions");

test("renders loading state", () => {
  (getBookByName as jest.Mock).mockResolvedValueOnce([]);
  const { getByText } = render(<SearchResult />);
  const loadingElement = getByText(/Browsing the entire database!/i);
  expect(loadingElement).toBeInTheDocument();
});

test("renders success state", async () => {
  (getBookByName as jest.Mock).mockResolvedValueOnce([
    { id: "1", title: "Test Book" },
  ]);
  const { getByText } = render(<SearchResult />);
  await waitFor(() => expect(getByText("Test Book")).toBeInTheDocument());
});

test("renders error state", async () => {
  (getBookByName as jest.Mock).mockRejectedValueOnce(new Error("Test error"));
  const { getByText } = render(<SearchResult />);
  await waitFor(() =>
    expect(getByText("Error: Test error")).toBeInTheDocument()
  );
});

test("renders empty state", async () => {
  (getBookByName as jest.Mock).mockResolvedValueOnce([]);
  const { getByText } = render(<SearchResult />);
  await waitFor(() =>
    expect(getByText("Oops, no result found!")).toBeInTheDocument()
  );
});
