import { render, screen } from "@testing-library/react";
import TableUsageData from "../Components/TableUsageData";

describe("Usage Data tests", () => {
  test("Displaying Usage Table", async () => {
    render(<TableUsageData />);

    expect(screen.getByTestId("usage-data-table")).toBeInTheDocument();
    expect(screen.getByTestId("timestamp-col")).toBeInTheDocument();
    expect(screen.getByTestId("filter-applied-col")).toBeInTheDocument();
    expect(screen.getByTestId("ip-address-col")).toBeInTheDocument();
  });
});
