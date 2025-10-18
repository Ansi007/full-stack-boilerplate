"use client";

import { useState } from "react";
import { trpc } from "@repo/trpc/client";

export default function Home() {
  return <CrudTestUI />;
}

function CrudTestUI() {
  const utils = trpc.useUtils();
  const [content, setContent] = useState("");

  // Queries
  const crudList = trpc.crud.findAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  // Mutations
  const createCrud = trpc.crud.createCrud.useMutation({
    onSuccess: () => {
      utils.crud.findAll.invalidate();
      setContent("");
    },
  });

  const deleteCrud = trpc.crud.deleteCrud.useMutation({
    onSuccess: () => utils.crud.findAll.invalidate(),
  });

  const handleCreate = () => {
    if (!content.trim()) return;
    createCrud.mutate({ content });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">tRPC CRUD Demo</h1>

      {/* Input */}
      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter new item..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={createCrud.isPending}
        />
        <button
          onClick={handleCreate}
          disabled={!content.trim() || createCrud.isPending}
          className={`px-4 py-2 rounded text-white transition 
            ${createCrud.isPending ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {createCrud.isPending ? "Adding..." : "Add"}
        </button>
      </div>

      {/* List */}
      <section className="w-full max-w-md bg-white rounded shadow p-4">
        {crudList.isLoading ? (
          <p className="text-gray-500">Loading items...</p>
        ) : crudList.data && crudList.data.length > 0 ? (
          crudList.data.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b last:border-0"
            >
              <span className="text-gray-700">{item.content}</span>
              <button
                onClick={() => deleteCrud.mutate({ id: item.id })}
                disabled={deleteCrud.isPending}
                className={`text-sm text-red-500 hover:text-red-600 ${
                  deleteCrud.isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {deleteCrud.isPending ? "..." : "Delete"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No items found</p>
        )}
      </section>
    </main>
  );
}