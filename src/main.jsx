import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthContext.jsx"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Board from './pages/Board.jsx'
import PrivateRoute from './components/privateRoute.jsx'
import Profile from './pages/Profile.jsx'
import './index.css'
import BoardDetail from './pages/BoardDetail.jsx'



// import App from './App.jsx'
const router = createBrowserRouter(
 
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='board' element={<PrivateRoute element={<Board />}/>} />
      <Route path='profile' element={<PrivateRoute element={<Profile />}/>} />
      <Route path="board/:id" element={<PrivateRoute element={<BoardDetail />} />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
