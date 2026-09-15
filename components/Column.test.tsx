import { render, screen } from "@testing-library/react";
import Column from "@/components/Column";
import type { Task } from "@/lib/tasks";

describe("Column", () => {
  it("renders each task's title when the column has tasks", () => {
    const tasks: Task[] = [
      { id: "1", title: "Write project brief", status: "todo" },
      { id: "2", title: "Set up repo", status: "todo" },
    ];

    render(<Column label="To do" tasks={tasks} />);

    expect(screen.getByText("Write project brief")).toBeInTheDocument();
    expect(screen.getByText("Set up repo")).toBeInTheDocument();
    expect(screen.getByText("To do (2)")).toBeInTheDocument();
  });

  it("shows an empty state when the column has no tasks", () => {
    render(<Column label="Doing" tasks={[]} />);

    expect(screen.getByText("No items yet")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
