import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar/index";
import axios from 'axios';
import img from "./welcome.jpg";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      const response = await axios.post('http://127.0.0.1:3000/author/login', formData);
      // console.log('Sign-up successful:', response.data);
      setFormData({
        email: '',
        password: '',
      });
      const jwtToken = response.data.token;
      localStorage.setItem('jwtToken', jwtToken);
      navigate('/');
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div>
        <img src={img} alt="profile image" style={{ width: "60%", marginTop: "70px" }}></img>
      </div>
      <div className="background">
        <form method="POST"
          style={{
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
          }}>
          <h3>
            Log in
          </h3>
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="Enter password"
            className={`form-input }`}
            placeholder="xyz@gmail.com"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="Enter password"
            className={`form-input }`}
            placeholder="******"
          />

          <button onClick={loginUser} type='submit'style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            borderRadius: "4px",
            cursor: "pointer",
            background: "#4169e1",
            color: "white",
            marginTop: "30px",
            marginbottom: "10px"
          }}>
            Log in
          </button>
        </form>
      </div>
    </>


  )
}

export default Login