
// ________________________________

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useListStore from "../store/useListStore";
import ListContainer from "../components/List";

const BoardDetail = () => {
  const { id } = useParams();
  const { lists, fetchLists, addList, deleteList } = useListStore();
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

  const handleDelete = async (listId, boardId) => {
    await deleteList(listId, boardId);
  };

  const sortedLists = lists[id]?.slice().sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt));

  return (
    <div className="mt-2 overflow-x-auto h-screen "> 
      <div className="flex justify-start mx-2 gap-2 min-w-max ">
        {sortedLists?.map((list) => (
          <ListContainer key={list.id} titleName={list.title} listId={list.id} boardId={id} />
        ))}
        <div 
        className="h-10 mt-2"
          style={{
            borderRadius: '1rem',
            backgroundColor: 'rgba(128, 128, 128, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          
            <input
              type="text"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              placeholder="Add list title"
              className= " px-2 py-2 rounded"
            />
            <button onClick={handleAddList} className="font-bold px-4 py-2 rounded ml-2">
              Add List
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
// ________________________________

