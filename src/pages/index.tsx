import { type ShoppingItem } from "@prisma/client";
import { type NextPage } from "next";
import { useState } from "react";
import ItemModal from "~/components/ItemModal";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data: itemsData, isLoading } = api.items.getAll.useQuery(undefined, {
    onSuccess: (items) => setItems(items),
  });

  if (!itemsData || isLoading) return <p>Loading...</p>;

  return (
    <>
      {modalOpen && (
        <ItemModal setModalOpen={setModalOpen} setItems={setItems} />
      )}
      <main className="mx-auto my-12 max-w-3xl">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">My shopping list</h2>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded bg-violet-500 px-4 py-2 font-bold text-white hover:bg-violet-700"
          >
            Add shopping item
          </button>
        </div>
        <ul className="mt-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
