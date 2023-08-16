import React, { useEffect, useState } from 'react';
import { SearchInput, Topic, LastWrapper, EButton, InputWrapper, Button, Input, Image, Container, Wrapper1, Wrapper2, PostWrapper, Starting, Heading, ReadTime, Title, Description, Ending, Likes, Comments, Date, Name, Email, Gender, Followers, Following, FollowWrapper } from "../components/Profile/ProfileElements";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaRegComment, FaRegEdit, FaPen, FaTrash, FaBookmark, FaEnvelope } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';


const MyDetails = () => {
	const [posts, setPosts] = useState([]);
	const [authorDetails, setAuthorDetails] = useState('');
	const [showInput, setShowInput] = useState(0);

	const [title, setTitle] = useState('');
	const [topic, setTopic] = useState('');
	const [imageFile, setImageFile] = useState(null); // State to store the selected image file
	const [text, setText] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (!jwtToken) {
			navigate("/signin");
		}
	}, []);

	const jwtToken = localStorage.getItem('jwtToken');
	const headers = {
		'authToken': jwtToken
	};


	useEffect(() => {
		console.log(headers);
		axios.get('http://127.0.0.1:3000/author/my/details', { headers })
			.then((response) => {
				setAuthorDetails(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);
			});
		axios.get('http://127.0.0.1:3000/get/myPost', { headers })
			.then((response) => {
				setPosts(response.data);
				console.log(posts);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);

			});
	}, [])

	useEffect(() => {
		RenderFeed();
	}, [posts]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file, 'filename.jpg', { charset: 'utf-8' });

		axios.post('http://127.0.0.1:3000/upload', formData, { headers }).then((response) => {
			setImageFile(response.data.file_url);
		})
			.catch((error) => {
				console.log("hello");
				console.error(error);
			})
		setImageFile(file);
	};

	const handleSave = () => {
		const postData = {
			title: title,
			topic: topic,
			text: text,
			author_id: 1,
			featured_image: imageFile
		};
		axios.post('http://127.0.0.1:3000/create/post', postData, { headers })
			.then((response) => {
				console.log('Post saved!', response.data);
				setTitle('');
				setText('');
				setImageFile(null);
				setTopic('');
			})
			.catch((error) => {
				console.error('Error saving post:', error);
			});
		axios.get('http://127.0.0.1:3000/get/myPost', { headers })
			.then((response) => {
				setPosts(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);

			});
		window.location.reload();

	};

	const handleSaveDraft = () => {
		const postData = {
			title: title,
			topic: topic,
			text: text,
			author_id: 1,
			featured_image: imageFile
		};


		axios.post('http://127.0.0.1:3000/draft/create', postData, { headers })
			.then((response) => {
				console.log('Post saved!', response.data);
				setTitle('');
				setText('');
				setImageFile(null);
				setTopic('');
			})
			.catch((error) => {
				console.error('Error saving draft:', error);
			});
		navigate('/myDrafts');
	};

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
		window.location.reload();
	}

	const toggleAdd = () => {
		setShowInput(1 - showInput);
	}

	const RenderFeed = () => {
		return (
			<>
				{posts.map((item) => {
					return (
						<PostWrapper key={item.id}>
							<Starting>
								<Heading>{item.author_name}</Heading>
								<ReadTime> {Number(0.008 * item.text.split(" ").length).toPrecision(3)} min read</ReadTime>
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
								<Date> Date : 16-08-2023</Date>
							</Ending>
							<LastWrapper>
								<Link to={`/post/${item.id}/edit`}><EButton><FaRegEdit /></EButton></Link>
								<EButton onClick={() => handleDelete(item.id)} ><FaTrash /></EButton>
								<div id="ed"></div>
							</LastWrapper>
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
					<Name>{authorDetails.name}</Name>
					<Email>{authorDetails.email}</Email>
					<br /><br />
					<EButton onClick={toggleAdd} style ={{backgroundColor : "#f44336" , padding : "10px" , color : "white"}}> Add Blog</EButton>
					<br /><br />
					<EButton onClick={() => navigate("/savedPosts") } style ={{backgroundColor : "#14a44d" , padding : "10px" , color : "white"}}> Saved Posts</EButton>
					<br /><br />
					{/* <EButton onClick={() => navigate("/myDrafts")} style ={{backgroundColor : "#f44336" , padding : "10px" , color : "white"}}> View Drafts</EButton> */}
					<br /><br />
				</Wrapper1>
				<Wrapper2>
					<InputWrapper show={showInput}>
						<Input id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></Input>
						<Input id="description" placeholder="Description" value={text} onChange={(e) => setText(e.target.value)}></Input>
						<Input id="topic" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)}></Input>
						<Input id="image" type="file" placeholder="Topic" accept="image/*" onChange={handleImageChange}></Input>
						<Button onClick={handleSave}>Add article</Button>
						<Button onClick={handleSaveDraft} style={{ marginLeft: "20px" }}>Save as Draft</Button>
					</InputWrapper>
					<RenderFeed />
				</Wrapper2>
			</Container>
		</>
	)
}

export default MyDetails