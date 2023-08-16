import { RTopic, Topic, Container, Wrapper1, SearchInput, Wrapper2, PostWrapper, Starting, Heading, ReadTime, Title, Description, Ending, Likes, Comments, Date } from "./FeedElements";
import { useState, useEffect } from "react";
import { FaEye, FaThumbsUp, FaRegComment } from "react-icons/fa6";
import axios from "axios";

const Feed = () => {
    const [post, setpost] = useState([]);
    const [rTopic, setRTopic] = useState("");
    const [input, setInput] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/posts/all')
            .then((response) => {
                setpost(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, [input, rTopic]);

    const search = () => {
        setInput(document.getElementById("searchbar").value.toLowerCase());
    }

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
            // console.log(post);
            const sortedarray = [...post].sort(compareLikes);
            setpost(sortedarray);
        }
        else if (sort == 2) {
            // console.log(post);
            const sortedarray = [...post].sort(compareComments);
            setpost(sortedarray);
        }
        else if (sort == 3) {
            // console.log(post);
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
                            <Starting>
                                <Heading>{item.author_name}</Heading>
                                <ReadTime> {Number(0.008 * item.text.split(" ").length).toPrecision(3)} min read</ReadTime>
                                <Topic>{item.topic}</Topic>
                            </Starting>
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
            </>
        )
    }
    return (
        <>
            <Container>
                <Wrapper1>
                    <SearchInput type="text" id="searchbar" onKeyUp={search} placeholder="Search articles" style = {{backgroundColor : "#ddc88ced"}}></SearchInput>
                    <br/><br/>
                    <div>
                        <div>
                            <h5>Recommended Topics</h5>
                            <div>
                                {post.map((item) => {
                                    return (
                                        <RTopic onClick={() => setRTopic(item.topic)}>  {item.topic}  </RTopic>
                                    );
                                })}
                            </div>
                            <br/><br/>
                            {/* <button style={{ cursor: "pointer" }} onClick={() => setRTopic("")} >Show All Posts</button> */}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="sort" >Sort by</label>
                        <select name="sort" id="sort" style = {{padding : "8px" , backgroundColor : "#ddc88ced"}}>
                            <option value="1">Most Likes</option>
                            <option value="2">Most Commented</option>
                        </select>
                        <button id="sortBtn" style = {{marginLeft : "10px", cursor: "pointer" , padding : "5px" , borderRadius : "10px" }}onClick={sortby}>Sort</button>
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