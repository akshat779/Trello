import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import useCardStore from "../store/useCardStore";



const Card = ({ cardId,title,boardId,listId}) => {
    const { deleteCard ,updateCardContent} = useCardStore();

    const handleDeleteCard = async(newcardId,listId,boardId) => {
        await deleteCard(newcardId,listId,boardId);

    }
    
    return (
        <div className="relative bg-white w-[90%] p-3 m-2 max-h-screen rounded-md">
            <button className="absolute top-2 right-8 " >
                <MdEdit className="text-black"/>
            </button>
            <button onClick={() =>  handleDeleteCard(cardId, listId, boardId)} className="absolute top-2 right-2 " >
                <IoCloseCircleOutline className="text-black"/>
            </button>
            <p className="break-words mt-4">{title}</p>
        </div>
    )
}

export default Card;