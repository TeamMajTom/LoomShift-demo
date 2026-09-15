import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AddTaskForm } from "@/components/AddTaskForm";

describe("AddTaskForm", () => {
  it("submits the trimmed title and clears the input", () => {
    const onAdd = vi.fn();
    render(<AddTaskForm onAdd={onAdd} />);

    const input = screen.getByLabelText("New task title");
    fireEvent.change(input, { target: { value: "  Write tests  " } });
    fireEvent.click(screen.getByRole("button", { name: "Add task" }));

    expect(onAdd).toHaveBeenCalledWith("Write tests");
    expect(input).toHaveValue("");
  });

  it("rejects an empty or whitespace-only title", () => {
    const onAdd = vi.fn();
    render(<AddTaskForm onAdd={onAdd} />);

    fireEvent.change(screen.getByLabelText("New task title"), {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add task" }));

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a title before adding a task.",
    );
  });
});
