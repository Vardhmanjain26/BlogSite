import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../components/Post/Post.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AiOutlineLike } from 'react-icons/ai'
import { BsBookmarkPlus } from 'react-icons/bs';
import { FaThumbsUp, FaRegComment, FaBookmark } from "react-icons/fa";

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
      navigate("/signin");
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
      <div className="post-details-container">

        <div className="post-details">

          <h3 className='post-title'>{post.title}</h3>
          <p className='post-topic'>{post.topic}</p>
          <div className='author-container'>
            <div className='top-container'>
              <i class="fa fa-user fa-lg"></i>
              <a href={`/profile/${post.author_id}`} className='author'>{post.author_name}</a>
            </div>

            <div className='interaction'>


              {isLiked ? <p>{post.likes_count + 1}</p> : <p>{post.likes_count}</p>}
              {isLiked ? <FaThumbsUp onClick={handleDislike} style={{ cursor: "pointer" }}></FaThumbsUp> : <AiOutlineLike onClick={handleLike} style={{ cursor: "pointer" }}></AiOutlineLike>}
              &nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp; &nbsp;&nbsp;&nbsp;
              <p>{post.comments_count}</p>
              <FaRegComment onClick={openCommentPopup} style={{ cursor: "pointer" }} />
              &nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp; &nbsp;&nbsp;&nbsp;
              {
                isSaved ? <BsBookmarkPlus onClick={handleSavePost} style={{ cursor: "pointer" }} /> : <FaBookmark />
              }
            </div>
            <img class="post-img" src={post.image} alt={post.title} />
          </div>
          {showCommentPopup && (
            <div className="comment-popup">
              <div className="close-button-container">
                <button onClick={closeCommentPopup}>X</button>
              </div>
              <textarea
                rows="4"
                cols="50"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Enter your comment..."
              />
              <button onClick={handleSubmitComment}>Submit</button>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index} className="comment-box">
                    <p className="comment-author">{comment.author_name}</p>
                    <p className="comment-text">{comment.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className='post-text'>{post.text}</p>

        </div>


      </div>
    </>

  );
};

export default PostDetail;