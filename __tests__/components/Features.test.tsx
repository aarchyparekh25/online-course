import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Features from "../../src/components/Features";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Features Component", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    render(<Features />);
  });

  it("should render the course card with correct text and image", () => {
    const courseCard = screen.getByText("Interactive Courses").closest("div");

    expect(courseCard).toBeInTheDocument();
    expect(screen.getByText("Learn with hands-on activities and projects.")).toBeInTheDocument();

    const image = screen.getByAltText("Feature 1");
    expect(image).toBeInTheDocument();
  });

  it("should render the 'Learn More' button inside the course card", () => {
    const courseCard = screen.getByText("Interactive Courses").closest("div");
    expect(courseCard).toBeInTheDocument();

    const button = within(courseCard!).getByRole("button", { name: /Learn More/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Learn More");
  });

  it("should have hover effect on the course card", () => {
    const courseCard = screen.getByText("Interactive Courses").closest("div");
    expect(courseCard).toHaveClass("hover:scale-105");

    const button = within(courseCard!).getByRole("button", { name: /learn more/i });
    expect(button).toHaveClass("hover:bg-[#3E3192]");
  });

  it("should navigate correctly when the course button is clicked", async () => {
    const courseCard = screen.getByText("Interactive Courses").closest("div");
    const button = within(courseCard!).getByRole("button", { name: /learn more/i });

    await userEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith("/InteractiveCourse");
  });  
}); 
