import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const STORAGE_KEY = "sprintboard.tasks";

beforeEach(() => {
  window.localStorage.clear();
  vi.resetModules();
});

async function renderBoard() {
  const { Board } = await import("@/components/Board");
  return render(<Board />);
}

describe("Board", () => {
  it("shows an empty board for a first-time visitor", async () => {
    await renderBoard();

    expect(screen.getAllByText("No tasks yet")).toHaveLength(3);
  });

  it("keeps an added task in its column after a reload", async () => {
    const { unmount } = await renderBoard();

    fireEvent.change(screen.getByLabelText("New task title"), {
      target: { value: "Ship the feature" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add task" }));

    expect(screen.getByText("Ship the feature")).toBeInTheDocument();

    unmount();
    vi.resetModules();

    await renderBoard();

    expect(screen.getByText("Ship the feature")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: 'Move "Ship the feature" to Doing',
      }),
    ).toBeInTheDocument();
  });

  it("discards corrupted stored data and falls back to an empty board", async () => {
    window.localStorage.setItem(STORAGE_KEY, "{not valid json");

    await renderBoard();

    expect(screen.getAllByText("No tasks yet")).toHaveLength(3);
  });
});
