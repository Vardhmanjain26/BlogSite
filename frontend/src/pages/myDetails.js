import React, { useEffect, useState } from 'react';
import { Topic, LastWrapper, EButton, InputWrapper, Button, Input, Container, Wrapper1, Wrapper2, PostWrapper, PostWrapper2, Starting, Heading, ReadTime, Title, Description, Ending, Likes, Comments, Name, Email } from "../components/profile_elements";
import Navbar from '../components/Navbar';
import { useFetcher, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { BiSolidCommentEdit } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";


const MyDetails = () => {
	const [posts, setPosts] = useState([]);
	const [authorDetails, setAuthorDetails] = useState('');
	const [showInput, setShowInput] = useState(0);

	const [title, setTitle] = useState('');
	const [topic, setTopic] = useState('');
	const [imageFile, setImageFile] = useState(null);
	const [text, setText] = useState('');
	const [isPremiumMember, setIsPremiumMember] = useState(false);

	const [/* ... */ revisionHistory, setRevisionHistory] = useState([]);
	const [selectedRevision, setSelectedRevision] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (!jwtToken) {
			navigate("/login");
		}
		const premiumStatus = localStorage.getItem('premiumMembership');
		setIsPremiumMember(!!premiumStatus);
	}, []);

	const jwtToken = localStorage.getItem('jwtToken');
	const headers = {
		'authToken': jwtToken
	};


	useEffect(() => {
		axios.get('http://127.0.0.1:3000/author/my/details', { headers })
			.then((response) => {
				setAuthorDetails(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);
			});
		axios.get('http://127.0.0.1:3000/get/myPost', { headers })
			.then((response) => {
				setPosts(response.data);
				// console.log(posts);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);

			});
	}, [])

	useEffect(() => {
		const savedRevisions = localStorage.getItem('revisionHistory');
		if (savedRevisions) {
			setRevisionHistory(JSON.parse(savedRevisions));
		}
	}, []);

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
				console.error(error);
			})
		setImageFile(file);
	};

	const excerpt = (str) => {
		if (str.length > 300) {
			str = str.substring(0, 300) + " ... ";
		}
		return str;
	};

	const handleSave = () => {
		const newRevision = {
			title: title,
			topic: topic,
			text: text,
			featured_image: imageFile,
			timestamp: new Date().toLocaleString(),
		};

		setRevisionHistory(prevRevisionHistory => [...prevRevisionHistory, newRevision]);
		const updatedRevisions = [...revisionHistory, newRevision];
		localStorage.setItem('revisionHistory', JSON.stringify(updatedRevisions));

		const postData = {
			title: title,
			topic: topic,
			text: text,
			author_id: 1,
			featured_image: imageFile
		};
		axios.post('http://127.0.0.1:3000/create/post', postData, { headers })
			.then((response) => {
				// console.log('Post saved!', response.data);
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
				// console.log(response.data);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);

			});
		// window.location.reload();
	};

	useEffect(() => {
		localStorage.setItem('revisionHistory', JSON.stringify(revisionHistory));
	}, [revisionHistory]);

	const handleSelectRevision = (revision) => {
		setSelectedRevision(revision);
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
				// console.log('Post saved!', response.data);
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
				// console.log(response.data);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);

			});
		axios.get('http://127.0.0.1:3000/get/myPost', { headers })
			.then((response) => {
				setPosts(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);

			});
	}

	const handleMakePost = () => {
		if (selectedRevision) {
		  const postData = {
			title: selectedRevision.title,
			topic: selectedRevision.topic,
			text: selectedRevision.text,
			author_id: 1, 
			featured_image: selectedRevision.featured_image,
		  };
	  
		  axios.post('http://127.0.0.1:3000/create/post', postData, { headers })
			.then((response) => {
			  console.log('Post created:', response.data);
			})
			.catch((error) => {
			  console.error('Error creating post:', error);
			});

			axios.get('http://127.0.0.1:3000/get/myPost', { headers })
			.then((response) => {
				setPosts(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.error('Error fetching posts:', error);

			});
	  
		  setSelectedRevision(null);
		}
	  };
	  

	const toggleAdd = () => {
		setShowInput(1 - showInput);
	}

	const RenderFeed = () => {
		return (
			<>
				{posts.map((item) => {
					return (
						<PostWrapper key={item.id}>
							<Starting >
								<Topic>{item.topic}</Topic>
								<ReadTime style={{ marginLeft: "90px" }}> Read Time :{Number(0.008 * item.text.split(" ").length).toPrecision(3)} min </ReadTime>
							</Starting>

							<PostWrapper2>
								<Title to={`/post/${item.id}`} >
									{item.title}
								</Title>
								<img style={{
									height: "300px",
									width: "400px",
									display: "block",
									marginBottom: "10px",
									width: "100%"
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
							<LastWrapper>
								<Link to={`/post/${item.id}/edit`}><EButton><BiSolidCommentEdit /></EButton></Link>
								<EButton onClick={() => handleDelete(item.id)} style={{ marginLeft: "670px" }} ><BsTrashFill /></EButton>
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
					<h1> <Name>{authorDetails.name}</Name> </h1>
					<Email>{authorDetails.email}</Email>
					<br /><br /><br />
					<div onClick={toggleAdd} style={{ color: "grey", padding: "10px", cursor: "pointer" }}> Add Post</div>
					<br /><br />
					<div onClick={() => navigate("/myDrafts")} style={{ color: "grey", padding: "10px", cursor: "pointer" }}> Drafts</div>
					<br /><br />
					<div onClick={() => navigate("/savedPosts")} style={{ padding: "10px", color: "grey", cursor: "pointer" }}> Saved Posts</div>
					<br /><br />
					<div onClick={() => navigate("/myDrafts")} style={{ color: "grey", padding: "10px", cursor: "pointer" }}> Revision History</div>
					<br /><br />
					{isPremiumMember ? (
						<div style={{ padding: "10px", color: "grey", cursor: "pointer", fontSize: "14px" }}>You are a premium member.</div>
					) : (
						<Link to={`/payment`}><EButton style={{ padding: "10px", color: "grey", cursor: "pointer", fontSize: "18px" }}> Buy Premium</EButton></Link>)
					}

				</Wrapper1>
				<Wrapper2>
					<InputWrapper show={showInput}>
						<Input id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></Input>
						<Input id="topic" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)}></Input>
						<textarea rows="10" cols="300" id="description" placeholder="Description" value={text} onChange={(e) => setText(e.target.value)}
							style={{
								width: "100%",
								padding: "10px",
								border: "none",
								fontSize: "20px",
								marginBottom: "1rem",
								backgroundColor: "lightgrey"
							}}
						/>
						<Input id="image" type="file" placeholder="Topic" accept="image/*" onChange={handleImageChange}></Input>
						<Button onClick={handleSaveDraft}>Save as Draft</Button>
						<Button onClick={handleSave} style={{ marginLeft: "550px" }}>Add Post</Button>
					</InputWrapper>
					<RenderFeed />

					{/* Render the Revision History */}
					<div>
						<h2>Revision History</h2>
						{revisionHistory.map((revision, index) => (
							<div key={index}>
								<button onClick={() => handleSelectRevision(revision)}>Version {index + 1}</button>
								<span>{revision.timestamp}</span>
							</div>
						))}
					</div>

					{/* Render the selected revision in the editor */}
					{selectedRevision && (
						<div>
							<h2>Selected Revision</h2>
							<h3>{selectedRevision.title}</h3>
							<p>{selectedRevision.topic}</p>
							<p>{selectedRevision.text}</p>
							{selectedRevision.featured_image && (
								<img src={selectedRevision.featured_image} alt={selectedRevision.title} style={{ width: "400px", height: "400px" }} />
							)}
							{/* Button to make the selected revision a post */}
							<button onClick={handleMakePost}>Make Post</button>
						</div>
					)}
				</Wrapper2>
			</Container>
		</>
	)
}

export default MyDetails