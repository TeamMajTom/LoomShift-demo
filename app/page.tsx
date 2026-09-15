import { Board } from "@/components/Board";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 px-4 py-8 dark:bg-black sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Sprintboard
        </h1>
        <Board />
      </div>
    </div>
  );
}
