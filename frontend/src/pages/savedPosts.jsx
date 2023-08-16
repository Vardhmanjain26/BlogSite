import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/SavePost/SavedPost.css";
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
      navigate("/signin");
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
        <h2 className="mypost">Saved Posts</h2>
        {posts.map((post) => (
          <div key={post.post_id} className="post">
            <div className="post-details">
              <h3>Title: {post.post_title}</h3>
              <p>Topic: {post.topic}</p>
              <p>Author: {post.author_name}</p>
              <p>{post.text}</p>
              <Link to={`/post/${post.post_id}`}>View Details</Link>
            </div>
            <img src={post.featured_image} alt={post.title} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SavedPost;
