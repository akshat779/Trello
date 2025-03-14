
// ________________________________

import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import useCardStore from "../store/useCardStore";
import useListStore from "../store/useListStore";
import ListContainer from "../components/List";
import { DndContext, closestCorners ,DragOverlay, closestCenter} from "@dnd-kit/core";
import  useBoardStore  from "../store/useBoardStore";

const BoardDetail = () => {
  const { id } = useParams();
  const { lists, fetchLists, addList, deleteList } = useListStore();
  const [listTitle, setListTitle] = useState("");
  const { cards, fetchCards, moveCard } = useCardStore();
  const [activeCard, setActiveCard] = useState(null); 
  const { boards, fetchBoards } = useBoardStore();
  // const [boardColor, setBoardColor] = useState("#ffffff");
  const [boardGradient, setBoardGradient] = useState("linear-gradient(to bottom, #ffffff, #ffffff)");

  useEffect(() => {
    fetchBoards();
    fetchLists(id);
    fetchCards(id);
  }, [id]);

  useEffect(() => {
    const currentBoard = boards.find((board) => board.id === id);
    if (currentBoard) {
      const userColor = currentBoard.color || "#ffffff";
      setBoardGradient(`linear-gradient(to top, ${userColor}, #ffffff)`);
    }
  },[boards,id]);

  const handleAddList = async () => {
    if (listTitle.trim()) {
      await addList(listTitle, id);
      setListTitle("");
    }
  };

  const handleDelete = async (listId, boardId) => {
    await deleteList(listId, boardId);
  };


  const handleDragStart = (event) => {
    const { active } = event;
    setActiveCard(active); 
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null); 
    if (!over) return;

    const fromListId = active.data.current?.listId;
    const toListId = over.data.current?.listId;
   

    if (!fromListId || !toListId || fromListId === toListId) return;
    moveCard(active.id, fromListId, toListId, id);

  };


  const sortedLists = lists[id]?.slice().sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)) || [];



  return (
    <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    <div className="mt-2 overflow-x-auto h-screen rounded-xl " style={{background:boardGradient}}>
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
            className=" px-2 py-2 rounded"
          />
          <button onClick={handleAddList} className="font-bold px-4 py-2 rounded ml-2">
            Add List
          </button>

        </div>
      </div>
    </div>
    <DragOverlay>
        {activeCard ? (
          <Card
            cardId={activeCard.id}
            title={activeCard.data.current.title}
            boardId={id}
            listId={activeCard.data.current.listId}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardDetail;
// ________________________________

