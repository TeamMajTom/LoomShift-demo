import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
        onMoveTask={vi.fn()}
      />,
    );

    expect(screen.getByText("Write the report")).toBeInTheDocument();
    expect(screen.getByText("Review the PR")).toBeInTheDocument();
  });

  it("shows an empty state when the column has no tasks", () => {
    render(<BoardColumn title="Done" tasks={[]} onMoveTask={vi.fn()} />);

    expect(screen.getByText("No tasks yet")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("disables the backward control for a task in the first column", () => {
    render(
      <BoardColumn
        title="To do"
        tasks={[{ id: "1", title: "Write the report", status: "todo" }]}
        onMoveTask={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: 'Move "Write the report" to the previous column' }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: 'Move "Write the report" to Doing' }),
    ).toBeEnabled();
  });

  it("disables the forward control for a task in the last column", () => {
    render(
      <BoardColumn
        title="Done"
        tasks={[{ id: "1", title: "Ship it", status: "done" }]}
        onMoveTask={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: 'Move "Ship it" to Doing' }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: 'Move "Ship it" to the next column' }),
    ).toBeDisabled();
  });

  it("calls onMoveTask with the task id and direction when a control is clicked", () => {
    const onMoveTask = vi.fn();
    render(
      <BoardColumn
        title="Doing"
        tasks={[{ id: "1", title: "Review the PR", status: "doing" }]}
        onMoveTask={onMoveTask}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: 'Move "Review the PR" to Done' }),
    );

    expect(onMoveTask).toHaveBeenCalledWith("1", "next");
  });
});
