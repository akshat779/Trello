import { useEffect, useState } from "react";
import  useBoardStore  from "../store/useBoardStore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AddBoard from "../components/AddBoard";


const Board = () => {
  const { user, logout } = useAuth();
  const { boards, fetchBoards, addBoard, deleteBoard } = useBoardStore();
  const [boardTitle, setBoardTitle] = useState("");
  const [boardColor, setBoardColor] = useState("#ffffff");


  useEffect(() => {
    if (user) fetchBoards(user.uid);
  }, [user]);

  const handleAddBoard = async () => {
    if (boardTitle.trim()) {
      await addBoard(boardTitle, user.uid,boardColor);
      setBoardTitle("");
      setBoardColor("#ffffff");
    }
  };


  return (
    <div className="p-6">
    
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Your Boards</h1>
       
      </div>

      
      <div className="grid grid-cols-3 gap-4 mt-6">
        {boards.map((board) => (
          <div key={board.id} className="border p-4 rounded" style={{ backgroundColor: board.color }}>
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
