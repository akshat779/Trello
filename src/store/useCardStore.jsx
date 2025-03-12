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
