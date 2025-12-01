import { ProfileCard } from "@/components/dashboard/profile-card";
import { render, screen } from "@testing-library/react";

describe("ProfileCard Component", () => {
  const mockUser = {
    ID: "692d4c82ed6d134cba5e7302",
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password: "$2a$10$OXN6tt3GWeJZVQsaTwpr0eMPKD7wdyK.NFUryIxEujNrl6xnCjkNy",
    refresh_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiIiwiZW1haWwiOiIiLCJyb2xlIjoiIiwiZXhwIjoxNzY1MTgxMTg2fQ.WRKQ-3HgrC7j8nrAmDPPrjROhyzHhxRtxgIhcf6cloQ",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjkyZDRjODJlZDZkMTM0Y2JhNWU3MzAyIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6IiIsImV4cCI6MTc2NDY2Mjc4Nn0.Xup8x90apKpgawywcIxW7e_J6VM2-opr_jupxLpzA6Q",
    updated_at: "2025-12-01T08:06:26.843Z",
    created_at: "2025-12-01T08:06:26.843Z",
    user_id: "692d4c82ed6d134cba5e7302",
  };

  it("renders user profile info", () => {
    render(<ProfileCard user={mockUser} />);
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });
});
