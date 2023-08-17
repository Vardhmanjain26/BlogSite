import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SavedPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    authToken: jwtToken,
  };
  useEffect(() => {
    if (!jwtToken) {
      navigate("/register");
    }
    (async () => {
      await axios
        .get("http://127.0.0.1:3000/author/savedPosts", { headers })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1 style = {{textAlign : "center" , fontSize : "50px"}}>Saved Posts</h1>
        {posts.map((post) => (
          <div key = {post.post_id}>
            <div>
              <h1> {post.post_title}</h1>
              <img src={post.featured_image} alt={post.title} style={{width : "50%" }} />
              <h4> by {post.author_name}</h4>
              <div style={{marginTop : "20px"}}>{post.text}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SavedPost;
