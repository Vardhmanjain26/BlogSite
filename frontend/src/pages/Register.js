import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../components/form.css';
import Navbar from "../components/Navbar/index";
import axios from 'axios';
import img from "./welcome.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      const response = await axios.post('http://127.0.0.1:3000/create/author', formData);
      // console.log('Sign-up successful:', response.data);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      navigate('/login');
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <img src={img} alt="profile image" style={{ width: "60%", marginTop: "70px" }}></img>
      </div>
      <div className="background" >

        <form method="POST" onSubmit={handleSubmit} noValidate style={{
          width: "95%",
          backgroundColor: "rgba(255,255,255,0.13)",
          position: "absolute",
          transform: "translate(-50%,-50%)",
          top: "50%",
          left: "150%",
          marginTop: "4rem",
          borderRadius: "2px",
          backdropFilter: "blur(1px)",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(8,7,16,0.6)",
          padding: "50px 35px",
          marginBottom: "10rem"
        }}
        >
          <h3> Registration </h3>

          <label htmlFor="name">Username</label>
          <input
            className='form-input'
            type='text'
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder='xyz'
          />

          <label htmlFor="email">Email</label>
          <input
            className='form-input'
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder='xyz@gmail.com'
          />

          <label htmlFor="name">Password</label>
          <input
            className='form-input'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder='*******'
          />

          <button type='submit' style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            borderRadius: "4px",
            cursor: "pointer",
            background: "#4169e1",
            color: "white",
            marginTop: "30px",
            marginbottom: "10px"
          }}>
            Register
          </button>
        </form>

      </div >

    </>
  )
}

export default Register