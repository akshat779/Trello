import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useListStore  from "../store/useListStore";

const BoardDetail = () => {
  const { id } = useParams();
  const { lists, fetchLists, addList } = useListStore();
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    fetchLists(id);
  }, [id]);

  const handleAddList = async () => {
    if (listTitle.trim()) {
      await addList(listTitle, id);
      setListTitle("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Board Details</h1>

      <div className="mt-4 flex">
        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="New list title"
          className="border px-3 py-2 rounded w-full"
        />
        <button onClick={handleAddList} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Add List
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {lists[id]?.map((list) => (
          <div key={list.id} className="border p-4 rounded">
            <h2 className="font-semibold">{list.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardDetail;
