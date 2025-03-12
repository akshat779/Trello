import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoCloseCircleSharp } from "react-icons/io5";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddBoard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='flex justify-center items-center h-screen w-screen'
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
        <Box className="bg-white p-2 rounded w-[40%]">
            <div className='w-full pb-4 flex justify-end'>
            <button onClick={handleClose}><IoCloseCircleSharp className='text-xl text-textLogo' /></button>
            </div>
            <div className='flex flex-col gap-4'>
            <input
                type="text"
                placeholder="New board title"
                className="border-2 border-gray-200 px-3 py-2 rounded w-full"
            />
            <Button variant='outlined'> Add Board</Button>
            </div>
           
        </Box>
      </Modal>
    </div>
  );
}
