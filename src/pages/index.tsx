import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main className="mx-auto my-12 max-w-3xl">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">My shopping list</h2>
          <button
            type="button"
            className="rounded bg-violet-500 px-4 py-2 font-bold text-white hover:bg-violet-700"
          >
            Add shopping item
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
