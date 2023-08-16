import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Topic,Image, Container, Wrapper1, Wrapper2, PostWrapper, Starting, Heading, ReadTime, Title, Description, Ending, Likes, Comments, Date, Name, Email, Gender, Followers, Following, FollowWrapper } from "../components/Profile/ProfileElements";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaThumbsUp, FaRegComment } from "react-icons/fa";
import axios from 'axios';

const Profile = () => {
	const { uid } = useParams();
	const [userDetails, setUserDetails] = useState('');
	const [posts, setPosts] = useState([]);
	const jwtToken = localStorage.getItem('jwtToken');
	const headers = {
		'authToken': jwtToken
	};

	useEffect(() => {
		if (!jwtToken) {
			navigate("/signin")
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
							<img style={{ width: "400px" }} src={item.image} alt={item.title} />
							<Ending>
								<Likes>{item.likes_count} <FaThumbsUp style={{ margin: -4 }} /></Likes>
								<Comments>{item.comments_count} <FaRegComment style={{ margin: -4 }} /></Comments>
								<Date> Date: 16-08-2023</Date>
							</Ending>
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
					{/* <Image src={profileImg}></Image> */}
					<Name>{userDetails.name}</Name>
					<Email>{userDetails.email}</Email>
				</Wrapper1>
				<Wrapper2>
					<RenderFeed />
				</Wrapper2>
			</Container>
		</>
	)
}

export default Profile