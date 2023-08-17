import { RTopic, Topic, Container, Wrapper1, SearchInput, Wrapper2, PostWrapper, PostWrapper2, Starting, Heading, ReadTime, Title, Description, Ending, Likes, Comments, Date } from "./FeedElements";
import { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import axios from "axios";

const Feed = () => {
    const [post, setpost] = useState([]);
    const [rTopic, setRTopic] = useState("");
    const [input, setInput] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/posts/all')
            .then((response) => {
                setpost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, [input, rTopic]);

    const search = () => {
        setInput(document.getElementById("searchbar").value.toLowerCase());
    }
    const excerpt = (str) => {
        if (str.length > 300) {
            str = str.substring(0, 300) + " ... ";
        }
        return str;
    };


    const compareLikes = (postA, postB) => {
        return postB.likes_count - postA.likes_count;
    };
    const compareComments = (postA, postB) => {
        return postB.comments_count - postA.comments_count;
    };
    const compareViews = (postA, postB) => {
        return (postB.comments_count + postB.likes_count + 30 * postB.id) - (postA.comments_count + postA.likes_count + 30 * postA.id);
    };
    const sortby = () => {
        const sort = document.getElementById("sort").value;
        if (sort == 1) {
            const sortedarray = [...post].sort(compareLikes);
            setpost(sortedarray);
        }
        else if (sort == 2) {
            const sortedarray = [...post].sort(compareComments);
            setpost(sortedarray);
        }
        else if (sort == 3) {
            const sortedarray = [...post].sort(compareViews);
            setpost(sortedarray);
        }
    }

    const RenderFeed = () => {
        let postAr = post;
        if (input !== "") {
            postAr = post.filter(item => item.title.toLowerCase().includes(input) ||
                item.text.toLowerCase().includes(input) ||
                item.author_name.toLowerCase().includes(input));
        }
        if (rTopic !== "") {
            postAr = post.filter(item => item.topic === rTopic);
        }
        return (
            <>
                {postAr.map((item) => {
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
                                    height : "270px",
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
            </>
        )
    }
    return (
        <>
            <Container>
                <Wrapper1>
                    <h3>Search</h3>
                    <SearchInput type="text" id="searchbar" onKeyUp={search} placeholder="..." style={{ backgroundColor: "#ddc88ced" }}></SearchInput>

                    <div>
                        <label htmlFor="sort" style={{
                            padding: "8px",
                            cursor: "pointer",
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            fontSize: "20px",
                            fontWeight : "700"
                        }}> Sort by</label>
                        <select name="sort" id="sort" style={{
                            backgroundColor: "#ddc88ced" ,
                            padding: "8px",
                            cursor: "pointer",
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            fontSize: "20px",
                            marginBottom : "30px",
                        }}>
                            <option value="1">Most Likes</option>
                            <option value="2">Most Commented</option>
                        </select>
                        <button id="sortBtn" style={{ marginLeft: "1rem", cursor: "pointer", padding: "13px", borderRadius: "12px" ,  backgroundColor: "#ddc88ced" }} onClick={sortby}>Sort</button>
                    </div>
                    <div>
                        <div>
                            <h3 style={{
                                padding: "8px",
                                margin: "1rem",
                                cursor: "pointer",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                fontSize: "20px"
                            }}>Categories</h3>
                            <div>
                                {post.map((item) => {
                                    return (
                                        <RTopic key={item.id} onClick={() => setRTopic(item.topic)}>  {item.topic}  </RTopic>
                                    );
                                })}
                            </div>
                            <br /><br />
                        </div>
                    </div>
                </Wrapper1>

                <Wrapper2>
                    <RenderFeed />
                </Wrapper2>
            </Container>
        </>
    );
};

export default Feed;