import { create } from "zustand";
import { db } from "../context/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const useBoardStore = create((set) => ({
  boards: [],

  fetchBoards: async (userId) => {
    const querySnapshot = await getDocs(collection(db, "boards"));
    const boards = querySnapshot.docs
      .filter((doc) => doc.data().userId === userId)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    set({ boards });
  },

  addBoard: async (title, userId) => {
    const docRef = await addDoc(collection(db, "boards"), {
      title,
      createdAt: new Date(),
      userId,
    });
    set((state) => ({
      boards: [...state.boards, { id: docRef.id, title, createdAt: new Date(), userId }],
    }));
  },

  deleteBoard: async (boardId) => {
    await deleteDoc(doc(db, "boards", boardId));
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== boardId),
    }));
  },
}));

export default useBoardStore;
