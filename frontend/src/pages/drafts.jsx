import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Topic, Container, Wrapper1, SearchInput, Wrapper2, PostWrapper, Starting, Heading, ReadTime, Title, Description, Ending, Likes, Comments, Date } from "../components/Main/Feed/FeedElements";
import { FaEye, FaThumbsUp, FaRegComment } from "react-icons/fa6";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Draft = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };
    useEffect(() => {
        if (!jwtToken) {
            navigate("/signin");
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

    return (
        <>
            <Navbar />
            <Container>
                <Wrapper2>
                    <Title>Drafts</Title>
                    {posts.map((item) => {
                        return (
                            <PostWrapper key={item.id}>
                                <Starting>
                                    <Heading>{item.author_name}</Heading>
                                    <ReadTime> ~{Number(0.008 * item.text.split(" ").length).toPrecision(3)} min read</ReadTime>
                                    <Topic>{item.topic}</Topic>
                                </Starting>
                                <hr />
                                <Title to={`/post/${item.id}`} >
                                    {item.title}
                                </Title>
                                <Description>
                                    {item.text.substring(0, 100)}...
                                </Description>
                                <img style={{ width: "200px" }} src={item.image} alt={item.title} />
                                <Ending>
                                    <Likes>{item.likes_count} <FaThumbsUp style={{ margin: -4 }} /></Likes>
                                    <Comments>{item.comments_count} <FaRegComment style={{ margin: -4 }} /></Comments>
                                    <Date>Published on: 16-08-2023</Date>
                                </Ending>
                            </PostWrapper>
                        );
                    })}
                </Wrapper2>
            </Container>

        </>
    );
};

export default Draft;