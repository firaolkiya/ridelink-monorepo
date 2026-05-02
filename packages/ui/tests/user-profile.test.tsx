import { render, screen } from "@testing-library/react";

import { UserProfileCard } from "../src/user-profile.js";

describe("UserProfileCard", () => {
	it("renders profile details and extra content", () => {
		render(
			<UserProfileCard
				user={{
					id: "42",
					name: "Ada Lovelace",
					email: "ada@example.com",
					role: "admin",
					status: "active",
					createdAt: "2026-05-02T12:00:00.000Z",
					updatedAt: "2026-05-02T12:30:00.000Z",
				}}
				footer="Profile footer"
			>
				<p>Editable section</p>
			</UserProfileCard>,
		);

		expect(screen.getByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
		expect(screen.getByText("ada@example.com")).toBeInTheDocument();
		expect(screen.getByText("Editable section")).toBeInTheDocument();
		expect(screen.getByText("Profile footer")).toBeInTheDocument();
		expect(screen.getByText("admin")).toBeInTheDocument();
	});
});