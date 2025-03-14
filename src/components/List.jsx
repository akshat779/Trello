import { IoCloseCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import useCardStore from "../store/useCardStore";
import useListStore from "../store/useListStore";
import Card from "./Card";
import { horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


const ListContainer = ({ titleName, listId, boardId }) => {
    const { cards, fetchCards, addCard, deleteCard, moveCard } = useCardStore();
    const { deleteList } = useListStore();
    const [newCardContent, setNewCardContent] = useState("");
    const [editingCard, setEditingCard] = useState(null);

    useEffect(() => {
        fetchCards(boardId);
    }, [boardId, listId]);



    const handleDelete = async (listId, boardId) => {
        await deleteList(listId, boardId);
    };

    const handleAddCard = async (listId) => {
        if (newCardContent.trim()) {
            await addCard(newCardContent, listId, boardId);
            setNewCardContent("");
        }
    };

    const sortedCards = cards[boardId]?.[listId]?.slice().sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)) || [];
    const cardIds = sortedCards.map((card) => card.id);
    return (

        <div className="flex mt-2 flex-col h-fit items-center bg-gray-700 justify-between w-80 rounded-xl  ">

            <div className="flex mt-2 flex-col items-center justify-start w-80 bg-gray-700 rounded-lg ">
                <div className="flex justify-between w-full px-4">
                    <h1 className="text-gray-100 font-bold">{titleName}</h1>
                    <button onClick={() => handleDelete(listId, boardId)}><IoCloseCircleOutline className="text-white text-xl" /></button>
                </div>
                <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
                    
                    {sortedCards.length > 0 ? (
                        sortedCards.map((card) => (
                            <Card key={card.id} cardId={card.id} title={card.content} boardId={boardId} listId={listId} />
                        ))
                    ) : (
                       
                        <div className="py-1 text-gray-400 min-h-[10px] w-full flex items-center justify-center" >
                            Empty List
                        </div>
                    )}
                </SortableContext>

            </div>

            <div className="bg-gray-800 w-full mt-2 text-white rounded-2xl">
                <input
                    type="text"
                    value={newCardContent}
                    onChange={(e) => setNewCardContent(e.target.value)}
                    placeholder="Add card content"
                    className="px-2 py-2 rounded  text-white border-white  "
                />
                <button onClick={() => handleAddCard(listId)} className="text-blue px-4 py-2 rounded ml-2 ">
                    Add Card
                </button>
            </div>
        </div>
    );
};

export default ListContainer;
