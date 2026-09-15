import { Board } from "./Board";

export function App() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 20 }}>Sprintboard</h1>
      <Board />
    </main>
  );
}
