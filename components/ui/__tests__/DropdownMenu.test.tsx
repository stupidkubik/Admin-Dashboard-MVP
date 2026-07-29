import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DropdownMenu } from "../DropdownMenu";

describe("DropdownMenu", () => {
  it("exposes expanded state and returns focus after Escape", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu trigger="Columns">
        <label>
          <input type="checkbox" /> Name
        </label>
      </DropdownMenu>,
    );

    const trigger = screen.getByRole("button", { name: "Columns" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("closes after an outside pointer interaction", async () => {
    const user = userEvent.setup();
    render(
      <>
        <DropdownMenu trigger="Columns">
          <span>Menu content</span>
        </DropdownMenu>
        <button type="button">Outside</button>
      </>,
    );

    const trigger = screen.getByRole("button", { name: "Columns" });
    await user.click(trigger);
    expect(screen.getByText("Menu content")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByText("Menu content")).not.toBeInTheDocument();
  });
});
