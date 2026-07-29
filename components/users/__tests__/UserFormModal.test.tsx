import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { LocaleProvider } from "@/contexts/LocaleProvider";
import UserFormModal from "../UserFormModal";

const renderModal = (
  props: Partial<React.ComponentProps<typeof UserFormModal>> = {},
) =>
  render(
    <LocaleProvider>
      <UserFormModal
        open
        mode="create"
        onSubmit={jest.fn().mockResolvedValue(false)}
        onClose={jest.fn()}
        {...props}
      />
    </LocaleProvider>,
  );

describe("UserFormModal", () => {
  it("exposes labelled controls inside an accessible dialog", () => {
    renderModal();

    expect(
      screen.getByRole("dialog", { name: "Add user" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Role" })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Active" }),
    ).toBeInTheDocument();
  });

  it("associates validation errors with invalid controls", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.clear(screen.getByRole("textbox", { name: "Name" }));
    await user.click(screen.getByRole("button", { name: "Create user" }));

    const name = screen.getByRole("textbox", { name: "Name" });
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription();
  });

  it("announces request errors and passes axe", async () => {
    renderModal({ errorMessage: "Email already exists" });

    expect(screen.getByRole("alert")).toHaveTextContent("Email already exists");
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
