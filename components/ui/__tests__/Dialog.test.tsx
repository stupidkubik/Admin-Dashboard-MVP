import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Dialog } from "../Dialog";

describe("Dialog", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when closed", () => {
    render(
      <Dialog open={false} onClose={onClose} title="Test dialog">
        Dialog content
      </Dialog>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("associates its title and description with the dialog", () => {
    render(
      <Dialog
        open
        onClose={onClose}
        title="Test dialog"
        description="Useful context"
      >
        Dialog content
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog", { name: "Test dialog" });
    expect(dialog).toHaveAccessibleDescription("Useful context");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("closes with Escape", async () => {
    const user = userEvent.setup();
    render(
      <Dialog open onClose={onClose} title="Test dialog">
        <button type="button">Action</button>
      </Dialog>,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("traps Tab navigation inside the overlay", async () => {
    const user = userEvent.setup();
    render(
      <Dialog open onClose={onClose} title="Test dialog">
        <button type="button">First action</button>
        <button type="button">Last action</button>
      </Dialog>,
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    const lastButton = screen.getByRole("button", { name: "Last action" });
    expect(closeButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(lastButton).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();
  });

  it("restores focus and body scrolling when closed", () => {
    const opener = document.createElement("button");
    document.body.append(opener);
    opener.focus();

    const { rerender } = render(
      <Dialog open onClose={onClose} title="Test dialog">
        Dialog content
      </Dialog>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Dialog open={false} onClose={onClose} title="Test dialog">
        Dialog content
      </Dialog>,
    );

    expect(document.body.style.overflow).toBe("");
    expect(opener).toHaveFocus();
    opener.remove();
  });

  it("closes only when the overlay itself is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dialog open onClose={onClose} title="Test dialog">
        <span>Dialog content</span>
      </Dialog>,
    );

    await user.click(screen.getByText("Dialog content"));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(
      document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement,
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("has no automated accessibility violations", async () => {
    render(
      <Dialog
        open
        onClose={onClose}
        title="Test dialog"
        description="Useful context"
      >
        <button type="button">Action</button>
      </Dialog>,
    );

    expect(await axe(document.body)).toHaveNoViolations();
  });
});
