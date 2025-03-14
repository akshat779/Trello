
// ________________________________
import { create } from "zustand";
import { db } from "../context/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const useCardStore = create((set) => ({
  cards: {},


fetchCards: async (boardId) => {
  const querySnapshot = await getDocs(collection(db, "cards"));
  const cards = querySnapshot.docs
    .filter((doc) => doc.data().boardId === boardId)
    .map((doc) => ({ id: doc.id, ...doc.data() }));

  const cardMap = cards.reduce((acc, card) => {
    if (!acc[card.listId]) acc[card.listId] = [];
    acc[card.listId].push(card);
    return acc;
  }, {});

  set((state) => ({
    cards: {
      ...state.cards,
      [boardId]: cardMap,
    },
  }));
},

  addCard: async (content, listId, boardId) => {
    const createdAt = parseInt(new Date().getTime());
    const docRef = await addDoc(collection(db, "cards"), {
      content,
      listId,
      boardId,
      createdAt
    });

    set((state) => ({
      cards: {
        ...state.cards,
        [boardId]: {
          ...(state.cards[boardId] || {}),
          [listId]: [...(state.cards[boardId]?.[listId] || []), { id: docRef.id, content, listId, boardId,createdAt }],
        },
      },
    }));
  },

  deleteCard: async (cardId, listId, boardId) => {
    await deleteDoc(doc(db, "cards", cardId));
    set((state) => ({
      cards: {
        ...state.cards,
        [boardId]: {
          ...(state.cards[boardId] || {}),
          [listId]: state.cards[boardId][listId].filter((card) => card.id !== cardId),
        },
      },
    }));
  },

  updateCardContent: async (cardId, listId, boardId, newContent) => {
    await updateDoc(doc(db, "cards", cardId), { content: newContent });
    set((state) => ({
      cards: {
        ...state.cards,
        [boardId]: {
          ...(state.cards[boardId] || {}),
          [listId]: state.cards[boardId][listId].map((card) =>
            card.id === cardId ? { ...card, content: newContent } : card
          ),
        },
      },
    }));
  },


moveCard: async (cardId, fromListId, toListId, boardId) => {
    set((state) => {
      const cardToMove = state.cards[boardId][fromListId].find((card) => card.id === cardId);
      if(!cardToMove) return state;
  
      return {
        cards: {
          ...state.cards,
          [boardId]: {
            ...state.cards[boardId],
            [fromListId]: state.cards[boardId][fromListId].filter((card) => card.id !== cardId),
            [toListId]: [...(state.cards[boardId][toListId] || []), cardToMove],
          },
        },
      };
    });
    const cardDocRef = doc(db, "cards", cardId);
    await updateDoc(cardDocRef, { listId: toListId });
  },

}));

export default useCardStore;
