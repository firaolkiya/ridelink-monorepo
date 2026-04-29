import { render, screen } from "@testing-library/react";

import { AuthCard } from "../src/auth-card.js";

describe("AuthCard", () => {
	it("renders shared auth copy and footer text", () => {
		render(<AuthCard mode="sign-in" footer="Shared auth footer" />);

		expect(screen.getByRole("heading", { name: "Sign in to continue" })).toBeInTheDocument();
		expect(screen.getByText("Shared auth footer")).toBeInTheDocument();
		expect(screen.getByLabelText("Email")).toBeInTheDocument();
	});

	it("accepts card-level class names", () => {
		render(<AuthCard mode="sign-up" className="feature-auth" />);

		expect(screen.getByText("Create a new workspace account").closest(".cbd-auth-card")).toHaveClass("feature-auth");
	});
});