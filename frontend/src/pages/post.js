import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AiOutlineLike } from 'react-icons/ai'
import { BsBookmarkPlus, BsSave2Fill } from 'react-icons/bs';
import { BiLike, BiComment } from "react-icons/bi";

const PostDetail = () => {

  const navigate = useNavigate();
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPosts] = useState([]);
  const [isLiked, setIsLiked] = useState('false');
  const [isSaved, setIsSaved] = useState('false');
  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
    'authToken': jwtToken
  };

  useEffect(() => {
    if (!jwtToken) {
      navigate("/register");
    }
    async function fetchMainData() {
      try {
        await axios.get(`http://127.0.0.1:3000/get/post/${postId}`)
          .then((response) => {
            setPosts(response.data);
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);

          });
      } catch (error) {
        console.error('Error fetching main API data:', error);
      }
    }

    fetchMainData();
  }, []);

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/like/already/liked?post_id=${postId}`, { headers })
      .then((response) => {
        console.log("checklikedlogging");
        setIsLiked(response.data.success);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("checklikedlogging");
        console.error('Error fetching posts:', error);
      });
  }, [isLiked])


  useEffect(() => {


    axios.get(` http://127.0.0.1:3000/comment/all/${postId}`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });


  }, []);


  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleDislike = () => {
    axios.delete(`http://127.0.0.1:3000/like/remove/${postId}`, { headers })
      .then((response) => {
        setIsLiked(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  const handleLike = () => {

    axios.post(`http://127.0.0.1:3000/like/create/${postId}`, {}, { headers })
      .then((response) => {
        setIsLiked(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  const openCommentPopup = () => {
    setShowCommentPopup(true);
  };
  const closeCommentPopup = () => {
    setShowCommentPopup(false);
    setNewComment('');
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment) {
      const Comment = {
        post_id: postId,
        text: newComment
      }
      setNewComment('');

      axios.post('http://127.0.0.1:3000/comment/create', Comment, { headers })
        .then((response) => {
          console.log("commented");
          console.log(response.data);
        })
        .catch((error) => {
          console.log('cannot put there');
          console.error('Error fetching posts:', error);

        });
      axios.get(` http://127.0.0.1:3000/comment/all/${postId}`)
        .then((response) => {
          setComments(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);

        });
    }

  };


  const handleSavePost = () => {
    axios.post(`http://127.0.0.1:3000/author/saveForLater/${postId}`, {}, { headers })
      .then((response) => {
        console.log(response.data);
        setIsSaved(false);
      })
      .catch((error) => {
        console.log('cannot put there');
        console.error('Error fetching posts:', error);

      });

  }
  return (
    <>
      <Navbar />
      <div>

        <h3 className='post-title'>{post.title}</h3>
        <div className='author-container'>
          <img src={post.image} alt={post.title} style={{ width: "50%" }} />
          <span> Author : <a href={`/profile/${post.author_id}`} className='author'> {post.author_name}</a></span>

          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            {isLiked ? <> {post.likes_count + 1} </> : <>{post.likes_count}</>}
            {isLiked ? <AiOutlineLike onClick={handleDislike} style={{ cursor: "pointer", marginRight: "30px" }}></AiOutlineLike> : <BiLike onClick={handleLike} style={{ cursor: "pointer", marginRight: "30px" }}></BiLike>}
            <>{post.comments_count}</>
            <BiComment onClick={openCommentPopup} style={{ cursor: "pointer", marginRight: "30px" }} />
            {isSaved ? <BsBookmarkPlus onClick={handleSavePost} style={{ cursor: "pointer" }} /> : <BsSave2Fill />}
          </div>
        </div>
        {showCommentPopup && (
          <div >
            <textarea
              rows="10"
              cols="100"
              value={newComment}
              onChange={handleCommentChange}
              style={{ backgroundColor: "Lightgrey", marginBottom: "5px" }}
            />
            <div style = {{marginBottom : "10px"}}>
              <button onClick={closeCommentPopup} style={{ color: "white", backgroundColor: "red"}}> close </button>
              <button onClick={handleSubmitComment} style = {{color : "white" , backgroundColor : "blue" , marginLeft : "5px"}}>Submit</button>
            </div>
            
            {/* <ul>
              {comments.map((comment, index) => (
                <li key={index} className="comment-box">
                  <p className="comment-author">{comment.author_name}</p>
                  <p className="comment-text">{comment.text}</p>
                </li>
              ))}
            </ul> */}
          </div>
        )}
        <div style={{ fontSize: "25px" }}>{post.text}</div>

      </div>
    </>

  );
};

export default PostDetail;