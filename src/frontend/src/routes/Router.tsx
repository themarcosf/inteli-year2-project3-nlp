import React from "react"
import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/home/Home"
import Start from "../pages/start/Start"
import Welcome from "../pages/welcome/Welcome"
import Login from "../pages/login/Login"
import SignUp from "../pages/signup/SignUp"
import Ask from "../pages/ask/Ask"
import Chat from "../pages/chat/Chat"

const Router: FC = () => {
  return <BrowserRouter>
    <Routes>
      <Route path='' element={<Welcome/>}/>
      <Route path='/start' element={<Start/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/ask' element={<Ask/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
  </BrowserRouter>
}

export default Router