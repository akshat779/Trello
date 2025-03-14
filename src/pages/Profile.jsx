import React from "react";
import { Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const { uid, displayName, email, photoURL, metadata } = user;
  const { creationTime, lastLoginAt } = metadata;
  console.log(user?.metadata);
  return (
    <Box className="flex justify-center items-start h-screen p-10">
      <Box className="bg-profilebackground p-4 rounded-xl w-[60%] flex flex-col gap-6">
        <Box className="flex justify-start gap-3 items-center">
          <div className="h-[20px] rounded-lg w-[8px] bg-highlight"></div>
          <h1 className="text-xl text-white">User Details</h1>
        </Box>
        <Box className="flex justify-start items-center gap-4">
          <Box>
            <img
              className="rounded-[100px] h-[100%] w-[100%]"
              src={photoURL}
              alt="user"
            />
          </Box>
          <Box className="flex flex-col gap-4">
            <Box>
              <h1 className="text-white font-bold">Name: {displayName}</h1>
            </Box>
            <Box>
              <h1 className="text-white font-bold">Email: {email}</h1>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
