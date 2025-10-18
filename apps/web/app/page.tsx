"use client";

import { useState } from "react";
import { trpc } from "@repo/trpc/client";

export default function Home() {
  return (
    <CrudTestUI />
  );
}

function CrudTestUI() {
  const utils = trpc.useUtils();
  const [content, setContent] = useState("");

  // ✅ Queries
  const crudList = trpc.crud.findAll.useQuery();

  // ✅ Mutations
  const createCrud = trpc.crud.createCrud.useMutation({
    onSuccess: () => utils.crud.findAll.invalidate(),
  });
  const deleteCrud = trpc.crud.deleteCrud.useMutation({
    onSuccess: () => utils.crud.findAll.invalidate(),
  });

  const handleCreate = () => {
    if (!content.trim()) return;
    createCrud.mutate({ content });
    setContent("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">tRPC CRUD Test UI</h1>

      {/* Create */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-64"
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="w-80 bg-white rounded shadow p-4">
        {crudList.isLoading ? (
          <p>Loading...</p>
        ) : crudList.data && crudList.data.length > 0 ? (
          crudList.data.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{item.content}</span>
              <button
                onClick={() => deleteCrud.mutate({ id: item.id })}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items yet</p>
        )}
      </div>
    </div>
  );
}
