import * as React from "react";
import { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import  useBoardStore  from "../store/useBoardStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddBoard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    <div>
      <button className="text-xl" onClick={handleOpen}>Add Board</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center h-screen w-screen"
      >
        
        <Box className="bg-white p-2 rounded w-[40%]">
          <div className="w-full pb-4 flex justify-end">
            <button onClick={handleClose}>
              <IoCloseCircleSharp className="text-xl text-textLogo" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-gray-500 font-bold" htmlFor="title">
                Enter a Title{" "}
              </label>
              <input
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                type="text"
                id="title"
                placeholder="New board title"
                className="border-2 border-gray-300 px-3 py-2 rounded w-full"
              />
            </div>
            <div className="mb-5">
              <label className="text-gray-500 font-bold " htmlFor="color">
                Select a Background Color
              </label>
              <input
                id="color"
                type="color"
                className="border-2 border-gray-300 px-6 h-10 py-2 rounded w-full"
                placeholder="Select a Color"
              />
            </div>
           
              <Button variant="outlined"> Add Board</Button>
           
          </div>
        </Box>
      </Modal>
    </div>
  );
}
