import { useEffect, useState } from "react";
import  useBoardStore  from "../store/useBoardStore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AddBoard from "../components/AddBoard";
import { IoMdCloseCircle } from "react-icons/io";



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

      {/* style={{ backgroundColor: board.color }} */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {boards.map((board) => (
          <div key={board.id} className="border p-4 py-6 rounded flex justify-between items-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }} >

            <Link to={`/board/${board.id}`} className="block text-xl font-semibold">
              {board.title}
            </Link>
            <div className="h-[20px] w-[20px] rounded-4xl" style={{backgroundColor: board.color}}></div>
            <button onClick={() => deleteBoard(board.id)} className="text-2xl">
            <IoMdCloseCircle />

            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
