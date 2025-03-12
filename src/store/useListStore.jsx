import { create } from "zustand";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const useListStore = create((set) => ({
  lists: {},

  fetchLists: async (boardId) => {
    const querySnapshot = await getDocs(collection(db, "lists"));
    const lists = querySnapshot.docs
      .filter((doc) => doc.data().boardId === boardId)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    set((state) => ({ lists: { ...state.lists, [boardId]: lists } }));
  },

  addList: async (title, boardId) => {
    const docRef = await addDoc(collection(db, "lists"), {
      title,
      boardId,
      createdAt: new Date(),
    });
    set((state) => ({
      lists: {
        ...state.lists,
        [boardId]: [...(state.lists[boardId] || []), { id: docRef.id, title, boardId }],
      },
    }));
  },

  deleteList: async (listId, boardId) => {
    await deleteDoc(doc(db, "lists", listId));
    set((state) => ({
      lists: {
        ...state.lists,
        [boardId]: state.lists[boardId].filter((list) => list.id !== listId),
      },
    }));
  },

  updateListTitle: async (listId, boardId, newTitle) => {
    await updateDoc(doc(db, "lists", listId), { title: newTitle });
    set((state) => ({
      lists: {
        ...state.lists,
        [boardId]: state.lists[boardId].map((list) =>
          list.id === listId ? { ...list, title: newTitle } : list
        ),
      },
    }));
  },
}));

export default useListStore;
