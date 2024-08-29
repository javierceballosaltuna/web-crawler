import { fireEvent, render, screen } from "@testing-library/react";
import Main from "../Main";
import Table from "../Components/Table";

const mockedResults = [
  {
    number: 1,
    title: "Mocked Title 1",
    points: 2000,
    comments: 3000,
  },
  {
    number: 2,
    title: "Mocked Title 2",
    points: 4000,
    comments: 6000,
  },
];

describe("Main page tests", () => {
  test("returns Main component", async () => {
    const useFind = jest.fn();
    await new useFind("/api/findScrapData");

    render(<Main />);

    expect(screen.getByTestId("Tabs")).toBeInTheDocument();
    expect(screen.getByTestId("Radiogroup")).toBeInTheDocument();

    expect(useFind).toHaveBeenCalledTimes(1);

    render(<Table data={mockedResults} />);
    expect(screen.getByTestId("main-data-table")).toBeInTheDocument();
  });

  test("Switching tabs", async () => {
    render(<Main />);
    const MainPagebButton = screen.getByRole("tab", { name: "Main Page" });
    const usageDataTabButton = screen.getByRole("tab", { name: "Usage Data" });
    expect(MainPagebButton).toBeInTheDocument();
    expect(MainPagebButton).toHaveAttribute("aria-selected", "true");
    expect(usageDataTabButton).toBeInTheDocument();
    expect(usageDataTabButton).toHaveAttribute("aria-selected", "false");

    fireEvent.click(usageDataTabButton);

    expect(MainPagebButton).toHaveAttribute("aria-selected", "false");
    expect(usageDataTabButton).toHaveAttribute("aria-selected", "true");
  });

  test("Click on radio group filters", async () => {
    render(<Main />);
    const plus5wordsFilter = screen.getByTestId(">5words");
    const less5wordsFilter = screen.getByTestId("<5words");
    const resetFilters = screen.getByTestId("reset");

    expect(plus5wordsFilter).toBeInTheDocument();
    expect(less5wordsFilter).toBeInTheDocument();
    expect(resetFilters).toBeInTheDocument();

    fireEvent.click(plus5wordsFilter);
    expect(plus5wordsFilter.getElementsByTagName("span")[0]).toHaveClass(
      "Mui-checked"
    );
    expect(less5wordsFilter.getElementsByTagName("span")[0]).not.toHaveClass(
      "Mui-checked"
    );
    expect(resetFilters.getElementsByTagName("span")[0]).not.toHaveClass(
      "Mui-checked"
    );

    fireEvent.click(less5wordsFilter);
    expect(plus5wordsFilter.getElementsByTagName("span")[0]).not.toHaveClass(
      "Mui-checked"
    );
    expect(less5wordsFilter.getElementsByTagName("span")[0]).toHaveClass(
      "Mui-checked"
    );
    expect(resetFilters.getElementsByTagName("span")[0]).not.toHaveClass(
      "Mui-checked"
    );

    fireEvent.click(resetFilters);
    expect(plus5wordsFilter.getElementsByTagName("span")[0]).not.toHaveClass(
      "Mui-checked"
    );
    expect(less5wordsFilter.getElementsByTagName("span")[0]).not.toHaveClass(
      "Mui-checked"
    );
    expect(resetFilters.getElementsByTagName("span")[0]).toHaveClass(
      "Mui-checked"
    );
  });
});
