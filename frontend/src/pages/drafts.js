import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Topic, Container, Wrapper2, PostWrapper, PostWrapper2, Starting, Heading, ReadTime, Title, Description, Ending, Likes, Comments, Date } from "../components/Main/Feed/FeedElements";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatSquareDotsFill } from "react-icons/bs";

const Draft = () => {

    const [selectedDraft, setSelectedDraft] = useState(null);


    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };
    useEffect(() => {
        if (!jwtToken) {
            navigate("/login");
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


    const handleSelectDraft = (draft) => {
        setSelectedDraft(draft);
    };

    const handleMoveDraftToPost = () => {
        if (selectedDraft) {
            const postData = {
                title: selectedDraft.title,
                topic: selectedDraft.topic,
                text: selectedDraft.text,
                author_id: 1, // Replace with the appropriate author ID
                featured_image: selectedDraft.featured_image,
            };

            axios.post('http://127.0.0.1:3000/create/post', postData, { headers })
                .then((response) => {
                    console.log('Draft moved to post:', response.data);
                    // You might want to update the UI or do something else after moving the draft
                })
                .catch((error) => {
                    console.error('Error moving draft to post:', error);
                    // Handle error, if needed
                });

            // Remove the selected draft from your drafts list
            // You can filter the posts array to exclude the selected draft
            const updatedPosts = posts.filter((item) => item.id !== selectedDraft.id);
            setPosts(updatedPosts);

            // Clear the selected draft
            setSelectedDraft(null);
        }
    };



    return (
        <>
            <Navbar />
            <Container>
                <Wrapper2>
                    <Title style={{ fontSize: "50px" }}>Drafts</Title>
                    <div style={{ marginBottom: "30px" }}> </div>
                    {posts.map((item) => {
                        return (
                            <PostWrapper key={item.id}>
                                <Starting >
                                    <Topic>{item.topic}</Topic>
                                    <ReadTime style={{ marginLeft: "100px" }}> Reading Time :{Number(0.008 * item.text.split(" ").length).toPrecision(3)} min </ReadTime>
                                </Starting>

                                <PostWrapper2>
                                    <Title to={`/post/${item.id}`} >
                                        {item.title}
                                    </Title>

                                    <img style={{
                                        height: "270px",
                                        width: "300px",
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "50%"
                                    }} src={item.image} alt={item.title} />

                                    <Description>
                                        {excerpt(item.text)}
                                    </Description>
                                </PostWrapper2>

                                <Ending style={{ marginBottom: "20px" }}>
                                    <Likes>{item.likes_count} <AiFillHeart style={{ margin: -4 }} />  </Likes>
                                    <Comments>{item.comments_count} <BsFillChatSquareDotsFill style={{ margin: -4 }} />  </Comments>
                                </Ending>
                                <Starting>
                                    <Heading>Author : {item.author_name}</Heading>
                                </Starting>
                                <Date> 23-Aug-2023 </Date>
                                <button onClick={() => handleSelectDraft(item)}>Move to Post</button>
                            </PostWrapper>
                        );
                    })}
                </Wrapper2>
            </Container>

            <div style = {{marginLeft : "auto" , marginRight : "auto" ,width : "80%"}}>
            {selectedDraft && (
                <>
                        <h1>Selected Draft</h1>
                        <PostWrapper>
                                <Starting >
                                    <Topic>{selectedDraft.topic}</Topic>
                                    <ReadTime style={{ marginLeft: "100px" }}> Reading Time :{Number(0.008 * selectedDraft.text.split(" ").length).toPrecision(3)} min </ReadTime>
                                </Starting>

                                <PostWrapper2>
                                    <Title to={`/post/${selectedDraft.id}`} >
                                        {selectedDraft.title}
                                    </Title>

                                    <img style={{
                                        height: "270px",
                                        width: "300px",
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "50%"
                                    }} src={selectedDraft.image} alt={selectedDraft.title} />

                                    <Description>
                                        {excerpt(selectedDraft.text)}
                                    </Description>
                                </PostWrapper2>

                                <Ending style={{ marginBottom: "20px" }}>
                                    <Likes>{selectedDraft.likes_count} <AiFillHeart style={{ margin: -4 }} />  </Likes>
                                    <Comments>{selectedDraft.comments_count} <BsFillChatSquareDotsFill style={{ margin: -4 }} />  </Comments>
                                </Ending>
                                <Starting>
                                    <Heading>Author : {selectedDraft.author_name}</Heading>
                                </Starting>
                                <button onClick={handleMoveDraftToPost}>Move to Post</button>
                            </PostWrapper>
                            </>
                )}
            </div>

        </>
    );
};

export default Draft;