import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileSection, { type ProfileField } from "../ProfileSection";

describe("ProfileSection", () => {
  const fields: ProfileField[] = [
    { id: "firstName", label: "First Name", placeholder: "John" },
    {
      id: "bio",
      label: "Bio",
      multiline: true,
      placeholder: "Tell us about yourself",
      colSpan: "full",
    },
  ];

  it("renders provided fields and avatar hint", () => {
    render(<ProfileSection fields={fields} avatarHint="Upload guidance" />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    expect(screen.getByText("Upload guidance")).toBeInTheDocument();
  });

  it("invokes callbacks when action buttons are clicked", async () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();

    render(
      <ProfileSection fields={fields} onSave={onSave} onCancel={onCancel} />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i }),
    );
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onSave).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });
});
