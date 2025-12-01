import { LoginInForm } from "@/components/auth/login";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Login Component", () => {
  it("renders email and password fields", () => {
    render(<LoginInForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("submits login successfully", async () => {
    render(<LoginInForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password");

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });
});
