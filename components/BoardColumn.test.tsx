import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BoardColumn } from "@/components/BoardColumn";

describe("BoardColumn", () => {
  it("renders each task's title when the column has tasks", () => {
    render(
      <BoardColumn
        title="To do"
        tasks={[
          { id: "1", title: "Write the report", status: "todo" },
          { id: "2", title: "Review the PR", status: "todo" },
        ]}
      />,
    );

    expect(screen.getByText("Write the report")).toBeInTheDocument();
    expect(screen.getByText("Review the PR")).toBeInTheDocument();
  });

  it("shows an empty state when the column has no tasks", () => {
    render(<BoardColumn title="Done" tasks={[]} />);

    expect(screen.getByText("No tasks yet")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
