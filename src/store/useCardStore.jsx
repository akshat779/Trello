import { create } from "zustand";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const useCardStore = create((set) => ({
  cards: {},

  fetchCards: async (boardId) => {
    const querySnapshot = await getDocs(collection(db, "cards"));
    const cards = querySnapshot.docs
      .filter((doc) => doc.data().boardId === boardId)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    set((state) => ({ cards: { ...state.cards, [boardId]: cards } }));
  },

  addCard: async (content, listId, boardId) => {
    const docRef = await addDoc(collection(db, "cards"), {
      content,
      listId,
      boardId,
      createdAt: new Date(),
    });

    set((state) => ({
      cards: {
        ...state.cards,
        [boardId]: [...(state.cards[boardId] || []), { id: docRef.id, content, listId, boardId }],
      },
    }));
  },

  deleteCard: async (cardId, boardId) => {
    await deleteDoc(doc(db, "cards", cardId));
    set((state) => ({
      cards: {
        ...state.cards,
        [boardId]: state.cards[boardId].filter((card) => card.id !== cardId),
      },
    }));
  },

  updateCardContent: async (cardId, boardId, newContent) => {
    await updateDoc(doc(db, "cards", cardId), { content: newContent });
    set((state) => ({
      cards: {
        ...state.cards,
        [boardId]: state.cards[boardId].map((card) =>
          card.id === cardId ? { ...card, content: newContent } : card
        ),
      },
    }));
  },

  moveCard: (cardId, fromListId, toListId, boardId) => {
    set((state) => {
      const card = state.cards[boardId].find((c) => c.id === cardId);
      if (!card) return state;

      const updatedCards = state.cards[boardId].map((c) =>
        c.id === cardId ? { ...c, listId: toListId } : c
      );

      return { cards: { ...state.cards, [boardId]: updatedCards } };
    });
  },
}));

export default useCardStore;


// import { create } from "zustand";
// import { db } from "./../context/firebase";
// import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";

// export const useCardStore = create((set) => ({
//   cards: {}, // { listId: [{id, title, description}] }
  
//   fetchCards: async (boardId) => {
//     try {
//       const q = query(collection(db, "cards"), where("boardId", "==", boardId));
//       const querySnapshot = await getDocs(q);
//       const cardMap = {};
//       querySnapshot.forEach((doc) => {
//         const card = { id: doc.id, ...doc.data() };
//         if (!cardMap[card.listId]) cardMap[card.listId] = [];
//         cardMap[card.listId].push(card);
//       });
//       set({ cards: cardMap });
//     } catch (error) {
//       console.error("Error fetching cards:", error);
//     }
//   },

//   addCard: async (title, listId, boardId) => {
//     try {
//       const docRef = await addDoc(collection(db, "cards"), { title, listId, boardId });
//       set((state) => ({
//         cards: {
//           ...state.cards,
//           [listId]: [...(state.cards[listId] || []), { id: docRef.id, title, listId, boardId }],
//         },
//       }));
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   },

//   updateCard: async (cardId, listId, updatedTitle) => {
//     try {
//       const cardRef = doc(db, "cards", cardId);
//       await updateDoc(cardRef, { title: updatedTitle });
//       set((state) => ({
//         cards: {
//           ...state.cards,
//           [listId]: state.cards[listId].map((card) =>
//             card.id === cardId ? { ...card, title: updatedTitle } : card
//           ),
//         },
//       }));
//     } catch (error) {
//       console.error("Error updating card:", error);
//     }
//   },

//   deleteCard: async (cardId, listId) => {
//     try {
//       await deleteDoc(doc(db, "cards", cardId));
//       set((state) => ({
//         cards: {
//           ...state.cards,
//           [listId]: state.cards[listId].filter((card) => card.id !== cardId),
//         },
//       }));
//     } catch (error) {
//       console.error("Error deleting card:", error);
//     }
//   },
// }));
