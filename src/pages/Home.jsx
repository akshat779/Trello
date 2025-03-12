import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import secondMainImg from "./../assets/secondMainImg.png";
import { Button } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";  

const Home = () => {
  const { user,loading } = useAuth();

  if(loading){
        return <div className='flex justify-center items-center h-screen'>
            <CircularProgress size={80} />
        </div>
      
  }

  return (
    <>
       
      <Grid container spacing={2} className="h-full">
        <Grid className="flex justify-center align-center" size={8}>
          <Box className="text-center  flex flex-col justify-center items-left gap-8">
            <Box className="flex flex-col gap-6 p-10 ">
              <h1 className="text-4xl font-bold text-primaryText">
                Capture, organize, and tackle your to-dos from anywhere.
              </h1>
              <div className="flex flex-col gap-2">
                <p className="text-2xl text-primaryText font-bold">
                  Escape the clutter and chaos—unleash your productivity with
                  Trello.
                </p>
                <p className="text-l text-primaryText font">
                  Trello is a web-based, kanban-style, list-making application
                  developed by Atlassian. Created in 2011 by Fog Creek Software,
                  it was spun out to form the basis of a separate company in New
                  York City in 2014 and sold to Atlassian in January 2017.
                </p>
              </div>
            </Box>
            <Box>
              {user ? (
                <h1 className="text-3xl font-bold text-primaryText">{`Hi ${user?.displayName} ! 👋`}</h1>
              ) : (
                <Button
                  variant="contained"
                  className="bg-primaryText text-white flex gap-2 justify-center items-center"
                >
                  Get Started
                  <FaGoogle />
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid className="text-center  " size={4}>
          <Box>
            <img
              src={
                "https://cdn.prod.website-files.com/62874bcfceeb975e3ca84248/6295cdd0f5b48345f9c55595_5e960b9034d6a7209a17724b_group%25403x.jpeg"
              }
              alt="main img"
            />
          </Box>
        </Grid>
        <Grid className="text-center " size={4}>
          <Box>
            <img src={secondMainImg} alt="second main img" />
          </Box>
        </Grid>
        <Grid className="flex justify-center align-center" size={8}>
          <Box className=" flex flex-col justify-evenly items-left">
            <Box className="flex flex-col gap-3">
              <h1 className="text-l font-bold font-primaryText">Trello 101</h1>
              <p className="text-5xl font-bold ">
                Your productivity <p className="text-blue-900">Powerhouse</p>
              </p>
            </Box>
            <Box>
              <p className="text-xl text-primaryText font-bold">
                Stay organized and efficient with Inbox, Boards, and Planner.
                Every to-do, idea, or responsibility—no matter how small—finds
                its place, keeping you at the top of your game.
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
