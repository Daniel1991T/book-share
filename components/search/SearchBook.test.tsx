// SearchBook.test.tsx
import { render, fireEvent } from "@testing-library/react";
import SearchBook from "./SearchBook";
import { getBookByName } from "@/lib/actions/book.actions";

test("renders SearchBook and checks if input works", () => {
  const { getByPlaceholderText } = render(<SearchBook />);
  const input = getByPlaceholderText("Search for a book");

  fireEvent.change(input, { target: { value: "Test book" } });
  expect((input as HTMLInputElement).value).toBe("Test book");
});

jest.mock("@/lib/actions/book.actions", () => ({
  // replace with the actual path
  getBookByName: jest.fn(),
}));

test("renders SearchBook and checks if input works", () => {
  // Mock the response from getBookByName
  (getBookByName as jest.Mock).mockResolvedValueOnce([
    { id: "1", title: "Test book" },
  ]);

  const { getByPlaceholderText } = render(<SearchBook />);
  const input = getByPlaceholderText("Search for a book");

  fireEvent.change(input, { target: { value: "Test book" } });
  expect((input as HTMLInputElement).value).toBe("Test book");

  // You can also assert that getBookByName was called with the correct arguments
  expect(getBookByName).toHaveBeenCalledWith({ searchQuery: "Test book" });
});
