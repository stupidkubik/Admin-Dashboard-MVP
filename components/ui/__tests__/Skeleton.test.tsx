import { render, screen } from "@testing-library/react";
import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders the default and custom classes with passed HTML attributes", () => {
    render(<Skeleton className="h-6" data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveClass(
      "animate-pulse",
      "rounded-md",
      "h-6",
    );
  });
});
