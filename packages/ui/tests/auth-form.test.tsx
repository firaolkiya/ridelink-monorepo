import { fireEvent, render, screen } from "@testing-library/react";

import { AuthForm } from "../src/auth.js";

describe("AuthForm", () => {
	it("submits trimmed form values", async () => {
		const onSubmit = vi.fn();
		render(<AuthForm onSubmit={onSubmit} defaultEmail="  user@example.com  " defaultRemember={false} />);

		fireEvent.change(screen.getByLabelText("Password"), { target: { value: "secret" } });
		fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

		expect(onSubmit).toHaveBeenCalledWith({
			email: "user@example.com",
			password: "secret",
			remember: false,
		});
	});

	it("renders the sign-up copy when requested", () => {
		render(<AuthForm mode="sign-up" />);

		expect(screen.getByRole("heading", { name: "Create account" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
	});
});