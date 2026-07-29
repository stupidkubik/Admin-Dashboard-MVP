import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "../Tabs";

describe("Tabs", () => {
  it("shows the first tab initially and switches content on click", async () => {
    render(
      <Tabs
        tabs={[
          { id: "first", label: "First", content: "First content" },
          { id: "second", label: "Second", content: "Second content" },
        ]}
      />,
    );

    expect(screen.getByText("First content")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("tab", { name: "Second" }));

    expect(screen.getByText("Second content")).toBeInTheDocument();
    expect(screen.queryByText("First content")).not.toBeInTheDocument();
  });
});
