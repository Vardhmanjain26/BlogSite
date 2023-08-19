import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Topic, Container, Wrapper1, Wrapper2, PostWrapper, PostWrapper2 , Starting, Heading, ReadTime, Title, Description, Ending, Likes, Comments, Date, Name, Email} from "../components/profile_elements";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import axios from 'axios';

const Profile = () => {
	const { uid } = useParams();
	const [userDetails, setUserDetails] = useState('');
	const [posts, setPosts] = useState([]);
	const jwtToken = localStorage.getItem('jwtToken');
	const headers = {
		'authToken': jwtToken
	};
	const excerpt = (str) => {
		if (str.length > 300) {
			str = str.substring(0, 300) + " ... ";
		}
		return str;
	};

	useEffect(() => {
		if (!jwtToken) {
			navigate("/login")
		}
		axios.get(`http://127.0.0.1:3000/get/post/author/${uid}`)
			.then((response) => {
				setPosts(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);

			});
		axios.get(`http://127.0.0.1:3000/author/details/${uid}`)
			.then((response) => {
				setUserDetails(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);

			});

	}, [uid])
	const navigate = useNavigate();
	const RenderFeed = () => {
		return (
			<>
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
								<Likes>{ item.likes_count }2 <AiFillHeart style={{ margin: -4 }} />  </Likes>
								<Comments>{item.comments_count}0 <BsFillChatSquareDotsFill style={{ margin: -4 }} />  </Comments>
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
			<Navbar />
			<Container>
				<Wrapper1>
					<Name> Author : {userDetails.name}</Name>
				</Wrapper1>
				<Wrapper2>
					<RenderFeed />
				</Wrapper2>
			</Container>
		</>
	)
}

export default Profile