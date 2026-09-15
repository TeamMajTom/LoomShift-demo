import Head from "next/head";
import Board from "@/components/Board";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sprintboard</title>
      </Head>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
        <h1 style={{ fontSize: 20 }}>Sprintboard</h1>
        <Board />
      </main>
    </>
  );
}
