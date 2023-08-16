import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Logout from "./pages/logout";
import Post from "./pages/post";
import Profile from "./pages/profile";
import {React} from "react";
import MyDetails from "./pages/myDetails";
import SavedPost from "./pages/savedPosts";
import EditPost from "./pages/editPost";
import Draft from "./pages/drafts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/post/:postId" exact element={<Post />} />
        <Route path="/profile/:uid" exact element={<Profile />} />
        <Route path="/myDetails" exact element={<MyDetails />} />
        <Route path="/post/:postId/edit" element={<EditPost />} />
        <Route path="/myDrafts" element={<Draft />} />
        <Route path="/savedPosts" exact element={<SavedPost />} />  
      </Routes>
    </BrowserRouter>
  );
};

export default App;
