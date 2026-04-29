import { render, screen } from "@testing-library/react";

import { Button } from "../src/button.js";

describe("Button", () => {
	it("renders children and respects disabled state", () => {
		render(<Button disabled>Save changes</Button>);

		const button = screen.getByRole("button", { name: "Save changes" });
		expect(button).toBeDisabled();
		expect(button).toHaveTextContent("Save changes");
	});

	it("supports full width layout", () => {
		render(<Button fullWidth>Continue</Button>);

		expect(screen.getByRole("button", { name: "Continue" })).toHaveStyle({ width: "100%" });
	});
});