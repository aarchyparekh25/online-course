import { render, screen , fireEvent } from '@testing-library/react';
import Testimonials from "../../src/app/testimonials/page"
import React from "react";

// Mock fetch API
global.fetch = jest.fn();

// Mock alert function
global.alert = jest.fn();

describe("Testimonials Edit Functionality", () => {
  it("should open prompt and update the testimonial on edit", async () => {
    // Mock testimonials data
    const mockTestimonial = {
      tid: "123",
      name: "John Doe",
      message: "Great platform!",
      image: "/default-image.webp",
    };

    // Mock fetch response for fetching testimonials
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockTestimonial],
    });

    // Mock prompt to simulate user editing message
    jest.spyOn(window, "prompt").mockReturnValue("Updated testimonial!");

    // Mock fetch response for edit request
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockTestimonial,
        message: "Updated testimonial!",
      }),
    });

    // Render component
    render(<Testimonials />);

    // Find edit button
    const editButton = await screen.findByText("Edit");

    // Click edit button
    fireEvent.click(editButton);

    // Ensure prompt was called
    expect(window.prompt).toHaveBeenCalledWith(
      "Edit your testimonial message:",
      mockTestimonial.message
    );

    // Ensure fetch was called with correct data
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials/edit/${mockTestimonial.tid}`,
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...mockTestimonial,
          message: "Updated testimonial!",
        }),
      })
    );

    // Ensure alert is called
    expect(global.alert).toHaveBeenCalledWith("Testimonial updated successfully!");
  });
});
