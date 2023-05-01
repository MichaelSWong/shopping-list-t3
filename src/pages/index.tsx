import { type ShoppingItem } from '@prisma/client'
import { type NextPage } from 'next'
import { useState } from 'react'
import ItemModal from '~/components/ItemModal'
import { api } from '~/utils/api'
import { HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'

const Home: NextPage = () => {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [checkedItems, setCheckedItems] = useState<ShoppingItem[]>([])

  const { data: itemsData, isLoading } = api.items.getAll.useQuery(undefined, {
    onSuccess: (shoppingItems) => {
      setItems(shoppingItems)
      const checked = shoppingItems.filter((item) => item.checked)
      setCheckedItems(checked)
    },
  })

  const { mutate: deleteItem } = api.items.deleteItem.useMutation({
    onSuccess(shoppingItem) {
      setItems((prev) => prev.filter((item) => item.id !== shoppingItem.id))
    },
  })

  const { mutate: toggleChecked } = api.items.toggleChecked.useMutation({
    onSuccess(shoppingItem) {
      // check if this item is already checked
      if (checkedItems.some((item) => item.id === shoppingItem.id)) {
        // remove it from the checked items
        setCheckedItems((prev) =>
          prev.filter((item) => item.id !== shoppingItem.id)
        )
      } else {
        // add it to the checked items
        setCheckedItems((prev) => [...prev, shoppingItem])
      }
    },
  })

  if (!itemsData || isLoading) return <p>Loading...</p>

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
          {items.map((item) => {
            const { id, name } = item
            return (
              <li key={id} className="flex w-full items-center justify-between">
                <div className="relative">
                  <div className="justifiy-center pointer-events-none absolute inset-0 flex origin-left items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: checkedItems.some((item) => item.id === id)
                          ? '100%'
                          : 0,
                      }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="h-[2px] w-full translate-y-px bg-red-500"
                    />
                  </div>

                  <span
                    onClick={() =>
                      toggleChecked({
                        id,
                        checked: checkedItems.some((item) => item.id === id)
                          ? false
                          : true,
                      })
                    }
                  >
                    {name}
                  </span>
                </div>
                <HiX
                  onClick={() => deleteItem({ id })}
                  className="cursor-pointer text-lg text-red-500"
                />
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}

export default Home
