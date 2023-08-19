import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/logout";
import Post from "./pages/post";
import Profile from "./pages/profile";
import {React} from "react";
import MyDetails from "./pages/myDetails";
import SavedPost from "./pages/savedPosts";
import EditPost from "./pages/editPost";
import Draft from "./pages/drafts";
import Payment from "./pages/payment";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/post/:postId" exact element={<Post />} />
        <Route path="/profile/:uid" exact element={<Profile />} />
        <Route path="/myDetails" exact element={<MyDetails />} />
        <Route path="/post/:postId/edit" element={<EditPost />} />
        <Route path="/myDrafts" element={<Draft />} />
        <Route path="/savedPosts" exact element={<SavedPost />} />  
        <Route path="/payment" exact element={<Payment />} />  
      </Routes>
    </BrowserRouter>
  );
};

export default App;
