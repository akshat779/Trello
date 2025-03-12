import { useEffect, useState } from "react";
import  useBoardStore  from "../store/useBoardStore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Board = () => {
  const { user, logout } = useAuth();
  const { boards, fetchBoards, addBoard, deleteBoard } = useBoardStore();
  const [boardTitle, setBoardTitle] = useState("");

  useEffect(() => {
    if (user) fetchBoards(user.uid);
  }, [user]);

  const handleAddBoard = async () => {
    if (boardTitle.trim()) {
      await addBoard(boardTitle, user.uid);
      setBoardTitle("");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Your Boards</h1>
       
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder="New board title"
          className="border px-3 py-2 rounded w-full"
        />
        <button onClick={handleAddBoard} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Add
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {boards.map((board) => (
          <div key={board.id} className="border p-4 rounded">
            <Link to={`/board/${board.id}`} className="block text-lg font-semibold">
              {board.title}
            </Link>
            <button onClick={() => deleteBoard(board.id)} className="text-red-500 mt-2">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
