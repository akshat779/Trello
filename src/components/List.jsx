// import { useEffect, useState } from "react";
// import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
// import Card from "./Card";
// import useListStore from "./../store/useListStore";
import { IoMdAdd } from "react-icons/io";
// import useCardStore from "../store/useCardStore";



// const ListContainer = ({ titleName, listId, boardId }) => {
//     const {cards,fetchCards} = useCardStore();


//     const { addCard } = useCardStore();
//     const [newCardContent, setNewCardContent] = useState("");
//     const [editingCard, setEditingCard] = useState(null);
//     const [updatedTitle, setUpdatedTitle] = useState("");
//     const { deleteList } = useListStore();
//     const handleDelete = async (listid, boardId) => {
//         await deleteList(listid, boardId)
//     }

//     const handleAddCard = async (listid) => {
//             if (newCardContent.trim()) {
//               await addCard(newCardContent, listid, boardId);
//               setNewCardContent("");
//             }
//           };

//     // if (!children) {
//     //     return (
//             // <div className="flex mt-2 flex-col items-center justify-center w-80 bg-gray-700 rounded-lg  overflow-y-auto">
//             //     <div className="w-full bg-gray-800 flex justify-between items-center p-2 rounded-t-lg">
//             //         <h1 className="text-gray-100 font-bold">{titleName}</h1>
//             //         <div className=" flex gap-2">
//             //             <div className="flex gap-2 justify-center items-center border-1 border-gray-500 rounded p-1" >
//             //                 <button className="text-white font-bold text-sm" onClick={() => handleAddCard(listId)}>Add card</button>
//             //                 <IoMdAdd className="text-white font-bold text-lg" />
//             //             </div>
//             //             <button onClick={() => handleDelete(listId, boardId)}><IoCloseCircleOutline className="text-white text-xl" /></button>
//             //         </div>
//             //     </div>
//             //     <input type="text"
//             //     placeholder="Enter A Card"
//             //     value={newCardContent}
//             //     onChange={(e) => setNewCardContent(e.target.value)} />
//             // </div>
//     //     );
//     // }
//     return (
//         // <div className="flex mt-5 flex-col items-center justify-center w-80 bg-gray-700 rounded-lg  ">
//         //     <div className="w-full bg-gray-800 flex justify-between items-center p-2 rounded-t-lg">
//         //         <h1 className="text-gray-100 font-bold">{titleName}</h1>
//         //         <button className="text-white text-xl"><IoMdAdd /></button>
//         //         <button onClick={() => handleDelete(listId, boardId)}><IoCloseCircleOutline className="text-white text-xl" /></button>
//         //         <input type="text"
//         //         placeholder="Enter A Card"
//         //         value={newCardContent}
//         //         onChange={(e) => setNewCardContent(e.target.value)} />
//         //     </div>
//         <div className="flex mt-2 flex-col items-center justify-center w-80 bg-gray-700 rounded-lg  overflow-y-auto">
//                 <div className="w-full bg-gray-800 flex justify-between items-center p-2 rounded-t-lg">
//                     <h1 className="text-gray-100 font-bold">{titleName}</h1>
//                     <div className=" flex gap-2">
//                         <div className="flex gap-2 justify-center items-center border-1 border-gray-500 rounded p-1" >
//                             <button className="text-white font-bold text-sm" onClick={() => handleAddCard(listId)}>Add card</button>
//                             <IoMdAdd className="text-white font-bold text-lg" />
//                         </div>
//                         <button onClick={() => handleDelete(listId, boardId)}><IoCloseCircleOutline className="text-white text-xl" /></button>
//                     </div>
//                 </div>
//                 <input type="text"
//                 placeholder="Enter A Card"
//                 value={newCardContent}
//                 onChange={(e) => setNewCardContent(e.target.value)} />
//                 {cards[boardId]?.map((card) => (
//                     <Card key={card.id} id={listId} title={card.content} />
//                 ))}
//             </div>);
//             {/* <div className="flex flex-col items-center justify-center w-80 pb-4">
//                 {
//                     children.map((card) => {
//                         return (

//                             <Card key={card.id} title={card.title} />
//                         )
//                     })
//                 }
//             </div> 
//          </div>   */}

// }

// export default ListContainer;

// import { create } from "zustand";
// import { db } from "../context/firebase";
// import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

// const useCardStore = create((set) => ({
//   cards: {},

//   fetchCards: async (boardId) => {
//     const querySnapshot = await getDocs(collection(db, "cards"));
//     const cards = querySnapshot.docs
//       .filter((doc) => doc.data().boardId === boardId)
//       .map((doc) => ({ id: doc.id, ...doc.data() }));

//     const cardMap = cards.reduce((acc, card) => {
//       if (!acc[card.listId]) acc[card.listId] = [];
//       acc[card.listId].push(card);
//       return acc;
//     }, {});

//     set((state) => ({ cards: { ...state.cards, [boardId]: cardMap } }));
//   },

//   addCard: async (content, listId, boardId) => {
//     const docRef = await addDoc(collection(db, "cards"), {
//       content,
//       listId,
//       boardId,
//       createdAt: new Date(),
//     });

//     set((state) => ({
//       cards: {
//         ...state.cards,
//         [boardId]: {
//           ...(state.cards[boardId] || {}),
//           [listId]: [...(state.cards[boardId]?.[listId] || []), { id: docRef.id, content, listId, boardId }],
//         },
//       },
//     }));
//   },

//   deleteCard: async (cardId, listId, boardId) => {
//     await deleteDoc(doc(db, "cards", cardId));
//     set((state) => ({
//       cards: {
//         ...state.cards,
//         [boardId]: {
//           ...(state.cards[boardId] || {}),
//           [listId]: state.cards[boardId][listId].filter((card) => card.id !== cardId),
//         },
//       },
//     }));
//   },

//   updateCardContent: async (cardId, listId, boardId, newContent) => {
//     await updateDoc(doc(db, "cards", cardId), { content: newContent });
//     set((state) => ({
//       cards: {
//         ...state.cards,
//         [boardId]: {
//           ...(state.cards[boardId] || {}),
//           [listId]: state.cards[boardId][listId].map((card) =>
//             card.id === cardId ? { ...card, content: newContent } : card
//           ),
//         },
//       },
//     }));
//   },

//   moveCard: (cardId, fromListId, toListId, boardId) => {
//     set((state) => {
//       const card = state.cards[boardId][fromListId].find((c) => c.id === cardId);
//       if (!card) return state;

//       const updatedFromList = state.cards[boardId][fromListId].filter((c) => c.id !== cardId);
//       const updatedToList = [...(state.cards[boardId][toListId] || []), { ...card, listId: toListId }];

//       return {
//         cards: {
//           ...state.cards,
//           [boardId]: {
//             ...state.cards[boardId],
//             [fromListId]: updatedFromList,
//             [toListId]: updatedToList,
//           },
//         },
//       };
//     });
//   },
// }));

// export default useCardStore;

import { useState, useEffect } from "react";
import useCardStore from "../store/useCardStore";
import useListStore from "../store/useListStore";

const ListContainer = ({ titleName, listId, boardId }) => {
    const { cards, fetchCards, addCard, deleteCard } = useCardStore();
    const { deleteList } = useListStore();
    const [newCardContent, setNewCardContent] = useState("");
    const [editingCard, setEditingCard] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");

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

    return (
        
        // _____________
        <div className="flex mt-2 flex-col h-fit items-center bg-gray-700 justify-between w-80 rounded-xl  "> 

            <div className="flex mt-2 flex-col items-center justify-start w-80 bg-gray-700 rounded-lg ">
                <h1 className="text-gray-100 font-bold">{titleName}</h1>
                <button onClick={() => handleDelete(listId, boardId)}><IoCloseCircleOutline className="text-white text-xl" /></button>
                {cards[boardId]?.[listId]?.map((card) => (
                    <div key={card.id} className="bg-white w-[90%] p-4 m-2 rounded-md">
                        <p className="break-words">{card.content}</p>
                    </div>
                ))}
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
