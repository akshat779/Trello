import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../context/AuthContext';
import Toast from './Toast';
import { Link } from 'react-router-dom';


export default function BasicMenu({userImage}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toastOpen, setToastOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const {logout} = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setToastOpen(true);
    handleClose();
    setTimeout(() => {
      logout();
    },2000)
  }

  const handleToastClose = (event,reason) => {
    if(reason === 'clickaway'){
      return
    }
    setToastOpen(false);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <img src={userImage} alt="user" className="w-8 h-8 rounded-full" />
      </Button>
    
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       
        <MenuItem  onClick={handleClose}><Link to="/profile" >Profile</Link></MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
        

         <Toast open={toastOpen} setOpen={setToastOpen} message={"Logged Out"}/>

    </div>
  );
}


