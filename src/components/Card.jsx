import React from "react";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import useCardStore from "../store/useCardStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const Card = ({ cardId,title,boardId,listId}) => {
    const { deleteCard ,updateCardContent} = useCardStore();
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ 
        id: cardId,
        data: {
            listId,
          },
         });
         const [isEditing, setIsEditing] = useState(false);
         const [newContent, setNewContent] = useState(title); 

    const handleDeleteCard = async(newcardId,listId,boardId) => {
        console.log(newcardId);
        await deleteCard(newcardId,listId,boardId);

    }
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
 
      const handleUpdateCard = async (e) => {
        e.stopPropagation(); 
        if (newContent.trim()) {
          await updateCardContent(cardId, listId, boardId, newContent); // Update the card content
          setIsEditing(false); 
        }
      };
      const handleEditCard = (e) => {
        e.stopPropagation(); 
        setIsEditing(true);
      };
    
      const handleCancelEdit = (e) => {
        e.stopPropagation(); 
        setIsEditing(false); 
        setNewContent(title); 
      };

    return (
        <div className="relative bg-white w-[90%] p-3 m-2 max-h-screen rounded-md">
        {isEditing ? (
            <div>
              <input
                type="text"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-2 border-b-1 border-gray-400 rounded"
              />
              <div className="flex justify-end mt-1">
                <button onClick={handleUpdateCard} className="text-blue px-2 rounded bg-gray-200 mr-2 cursor-pointer">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="text-red px-2 py-1 rounded bg-gray-200 cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          ) :
        (<div>
            <button onClick={handleEditCard} className="absolute top-2 right-8 cursor-pointer" >
                <MdEdit className="text-black"/>
            </button>
            <button onClick={() =>  handleDeleteCard(cardId, listId, boardId)} className="absolute top-2 right-2 cursor-pointer" >
                <IoCloseCircleOutline className="text-black"/>
            </button>
            <p  ref={setNodeRef} style={style} {...attributes} {...listeners} className="break-words mt-4 cursor-pointer">{title}</p>
        </div>)
        }
        </div>
    )
}

export default Card;