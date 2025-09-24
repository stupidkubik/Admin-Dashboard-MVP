import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsSidebar, { type SettingsTab } from "../SettingsSidebar";

const IconStub = () => null;

describe("SettingsSidebar", () => {
  const tabs: SettingsTab[] = [
    { id: "profile", label: "Profile", icon: IconStub },
    { id: "billing", label: "Billing", icon: IconStub },
  ];

  it("marks the first tab as active by default", () => {
    render(<SettingsSidebar tabs={tabs} />);

    const profileButton = screen.getByRole("button", { name: "Profile" });
    const billingButton = screen.getByRole("button", { name: "Billing" });

    expect(profileButton).toHaveClass("nav-item-active");
    expect(billingButton).not.toHaveClass("nav-item-active");
  });

  it("respects the provided active tab and invokes callback on click", async () => {
    const handleTabClick = jest.fn();

    render(
      <SettingsSidebar
        tabs={tabs}
        activeTabId="billing"
        onTabClick={handleTabClick}
      />,
    );

    const profileButton = screen.getByRole("button", { name: "Profile" });
    const billingButton = screen.getByRole("button", { name: "Billing" });

    expect(billingButton).toHaveClass("nav-item-active");
    expect(profileButton).not.toHaveClass("nav-item-active");

    await userEvent.click(profileButton);
    expect(handleTabClick).toHaveBeenCalledWith("profile");
  });
});
