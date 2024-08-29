import { render, screen } from "@testing-library/react";
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

describe("Table tests", () => {
  test("returns Main Table, check columns and data displayed", async () => {
    const useFind = jest.fn();
    await new useFind("/api/findScrapData");

    render(<Main />);

    expect(screen.getByTestId("Tabs")).toBeInTheDocument();
    expect(screen.getByTestId("Radiogroup")).toBeInTheDocument();

    expect(useFind).toHaveBeenCalledTimes(1);

    render(<Table data={mockedResults} />);
    expect(screen.getByTestId("main-data-table")).toBeInTheDocument();

    expect(screen.getByTestId("number-col")).toBeInTheDocument();
    expect(screen.getByTestId("title-col")).toBeInTheDocument();
    expect(screen.getByTestId("points-col")).toBeInTheDocument();
    expect(screen.getByTestId("comments-col")).toBeInTheDocument();

    expect(screen.getByText(mockedResults[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockedResults[1].points)).toBeInTheDocument();
  });
});
