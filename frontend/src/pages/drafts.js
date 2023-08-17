import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Topic, Container, Wrapper2, PostWrapper, PostWrapper2, Starting, Heading, ReadTime, Title, Description, Ending, Likes, Comments, Date } from "../components/Main/Feed/FeedElements";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatSquareDotsFill } from "react-icons/bs";

const Draft = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };
    useEffect(() => {
        if (!jwtToken) {
            navigate("/register");
        }
        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
            .then((response) => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
    }, []);

    const handleDelete = (postId) => {

        axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`, { headers })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
            .then((response) => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
    }
    const excerpt = (str) => {
        if (str.length > 200) {
            str = str.substring(0, 200) + " ... ";
        }
        return str;
    };


    return (
        <>
            <Navbar />
            <Container>
                <Wrapper2>
                    <Title style = {{fontSize : "50px"}}>Drafts</Title>
                    <div style = {{marginBottom : "30px"}}> </div>
                    {posts.map((item) => {
                        return (
                            <PostWrapper key={item.id}>
                                <Starting >
                                    <Topic>{item.topic}</Topic>
                                    <ReadTime style={{ marginLeft: "100px" }}> Reading Time :{Number(0.008 * item.text.split(" ").length).toPrecision(3)} </ReadTime>
                                </Starting>

                                <PostWrapper2>
                                    <Title to={`/post/${item.id}`} >
                                        {item.title}
                                    </Title>
                                    <Description>
                                        {excerpt(item.text)}
                                    </Description>
                                    <img style={{
                                        height: "270px",
                                        width: "300px",
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "50%"
                                    }} src={item.image} alt={item.title} />
                                </PostWrapper2>

                                <Ending style={{ marginBottom: "20px" }}>
                                    <Likes>{item.likes_count} <AiFillHeart style={{ margin: -4 }} />  </Likes>
                                    <Comments>{item.comments_count} <BsFillChatSquareDotsFill style={{ margin: -4 }} />  </Comments>
                                </Ending>
                                <Starting>
                                    <Heading>Author : {item.author_name}</Heading>
                                </Starting>
                                <Date> 17-Aug-2023 </Date>
                            </PostWrapper>
                        );
                    })}
                </Wrapper2>
            </Container>

        </>
    );
};

export default Draft;