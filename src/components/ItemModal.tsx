import type { ShoppingItem } from "@prisma/client";
import type { SetStateAction, Dispatch } from "react";
import { useState } from "react";
import { api } from "~/utils/api";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
}
const ItemModal = ({ setModalOpen, setItems }: ItemModalProps) => {
  const [input, setInput] = useState<string>("");
  const { mutate: addItem } = api.items.addItem.useMutation({
    onSuccess(shoppingItem) {
      setItems((prev) => [...prev, shoppingItem]);
    },
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 bg-white p-3">
        <h3 className="text-xl font-semibold">Name of item</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring"
        />
        <div className="grid grid-cols-2 gap-8">
          <button
            type="button"
            className="rounded-md bg-gray-500 p-2 text-sm text-white transition hover:bg-gray-600"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              addItem({ name: input });
              setModalOpen(false);
            }}
            className="rounded-md bg-violet-500 p-2 text-sm text-white transition hover:bg-gray-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
