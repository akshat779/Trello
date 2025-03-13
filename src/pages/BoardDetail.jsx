// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useListStore from "../store/useListStore";
// import ListContainer from "../components/List";
// import { listItemSecondaryActionClasses } from "@mui/material";

// const BoardDetail = () => {

//   const { id } = useParams();
//   const { lists, fetchLists, addList, deleteList } = useListStore();
//   const [listTitle, setListTitle] = useState("");
//     const [newCardTitle, setNewCardTitle] = useState("");
//   const [editingCard, setEditingCard] = useState(null);
//   const [updatedTitle, setUpdatedTitle] = useState("");

//   useEffect(() => {
//     fetchLists(id);
//   }, [id]);

//   const handleAddList = async () => {
//     if (listTitle.trim()) {
//       await addList(listTitle, id);
//       setListTitle("");
//     }
//   };

//   const handleDelete = async (listid, boardId) => {
//     await deleteList(listid, boardId)
//   }

//   const handleAddCard = async (listId) => {
//         if (newCardTitle.trim()) {
//           await addCard(newCardTitle, listId, boardId);
//           setNewCardTitle("");
//         }
//       };


//   // const cards = [
//   //   { id: 1, title: "Card 1" },
//   //   { id: 2, title: "Card 2" },
//   //   { id: 3, title: "Card dasdfadfadfsfdsfdsfsdfsdfsdfsdfsdfdsfsdfsdfasdfasdasdasdasdadadadadsa3" },
//   //   { id: 4, title: "Card 4" },
//   //   { id: 5, title: "Card 5" },
//   //   { id: 6, title: "Card 6" },
//   //   { id: 7, title: "Card 7" },
//   //   { id: 8, title: "Card 8" },
//   //   { id: 9, title: "Card 9" },
//   //   { id: 10, title: "Card 10" },
//   //   { id: 10, title: "Card 10" },
//   //   { id: 10, title: "Card 10" },
//   //   { id: 9, title: "Card 9" },
//   //   { id: 10, title: "Card 10" },
//   //   { id: 10, title: "Card 10" },
//   //   { id: 10, title: "Card 10" }

//   // ]

//   return (
//     <>

//       <div className="overflow-x-auto h-screen">
//         <div className="flex justify-start mx-2 gap-2 min-w-max">

//             {lists[id]?.map((list) => (

//               <ListContainer key={list.id} titleName={list.title} listId = {list.id} boardId = {id} />

//             ))}

//           <div className="mx-2 flex justify-around items-center mt-2 gap-2 w-[43%] h-[10%] rounded-2xl" style={{
//             borderRadius: '1rem',
//             backgroundColor: 'rgba(128, 128, 128, 0.3)',
//             backdropFilter: 'blur(10px)',
//             border: '1px solid rgba(255, 255, 255, 0.2)'
//           }}>
//             <input
//               type="text"
//               value={listTitle}
//               onChange={(e) => setListTitle(e.target.value)}
//               placeholder="Add list title"
//               className="pl-1 py-2 rounded "
//             />
//             <button onClick={handleAddList} className="font-bold px-4 py-2 rounded ml-2">
//               Add List
//             </button>
//           </div>
//         </div>
//       </div>


//     </>
//   );
// };

// export default BoardDetail;
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

  const sortedLists = lists[id]?.sort((a, b) => a.position - b.position);

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


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useListStore  from "../store/useListStore";
// import { useCardStore } from "../store/useCardStore";

// const BoardDetail = () => {
//   const { id: boardId } = useParams();
//   const { lists, fetchLists } = useListStore();
//   const { cards, fetchCards, addCard, updateCard, deleteCard } = useCardStore();

//   const [newCardTitle, setNewCardTitle] = useState("");
//   const [editingCard, setEditingCard] = useState(null);
//   const [updatedTitle, setUpdatedTitle] = useState("");

//   useEffect(() => {
//     fetchLists(boardId);
//     fetchCards(boardId);
//   }, [boardId]);

//   const handleAddCard = async (listId) => {
//     if (newCardTitle.trim()) {
//       await addCard(newCardTitle, listId, boardId);
//       setNewCardTitle("");
//     }
//   };

//   const handleUpdateCard = async (cardId, listId) => {
//     await updateCard(cardId, listId, updatedTitle);
//     setEditingCard(null);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Board Details</h1>
//       <div className="grid grid-cols-3 gap-4 mt-6">
//         {lists[boardId]?.map((list) => (
//           <div key={list.id} className="border p-4 rounded">
//             <h2 className="font-semibold">{list.title}</h2>

//             {/* Add Card */}
//             <div className="mt-2 flex">
//               <input
//                 type="text"
//                 value={newCardTitle}
//                 onChange={(e) => setNewCardTitle(e.target.value)}
//                 placeholder="New card title"
//                 className="border px-3 py-2 rounded w-full"
//               />
//               <button onClick={() => handleAddCard(list.id)} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
//                 Add
//               </button>
//             </div>

//             {/* Display Cards */}
//             <div className="mt-3">
//               {cards[list.id]?.map((card) => (
//                 <div key={card.id} className="border p-3 mt-2 rounded bg-gray-100">
//                   {editingCard === card.id ? (
//                     <div>
//                       <input
//                         type="text"
//                         value={updatedTitle}
//                         onChange={(e) => setUpdatedTitle(e.target.value)}
//                         className="border px-2 py-1 rounded w-full"
//                       />
//                       <button
//                         onClick={() => handleUpdateCard(card.id, list.id)}
//                         className="bg-blue-500 text-white px-2 py-1 rounded mt-1"
//                       >
//                         Save
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex justify-between">
//                       <span>{card.title}</span>
//                       <div>
//                         <button
//                           onClick={() => {
//                             setEditingCard(card.id);
//                             setUpdatedTitle(card.title);
//                           }}
//                           className="text-blue-500 mr-2"
//                         >
//                           Edit
//                         </button>
//                         <button onClick={() => deleteCard(card.id, list.id)} className="text-red-500">
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BoardDetail;
