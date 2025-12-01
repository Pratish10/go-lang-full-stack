import { RegisterForm } from "@/components/auth/register";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Register Component", () => {
  it("shows validation errors", async () => {
    render(<RegisterForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByText(/email required/i)).toBeInTheDocument();
  });

  it("submits register request", async () => {
    render(<RegisterForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/password/i), "pass1234");

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByText(/registered/i)).toBeInTheDocument();
  });
});
