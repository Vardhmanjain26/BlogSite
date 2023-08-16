import React , {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import '../components/Form/Form.css';
import Navbar from "../components/Navbar/index";
import {Button} from "../components/Form/FormElements"
import validate from '../components/Form/validateInfo';
import axios from 'axios';


const Signup = () => {
  const navigate = useNavigate(); 
  const [errors , setErrors] = useState({});
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData , [name]: value,});
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
      setErrors(validate(formData));
      navigate('/signin');
    } catch (error) {
       console.error('Sign-up failed:', error);
    }
  };

  return (
    <>
        <Navbar/>
        <div class="background">

          <form method="POST" onSubmit={handleSubmit} className='form' noValidate>
              <h3>Create Account</h3>

              <label for="name">Username</label>
                <input
                  className='form-input'
                  type='text'
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className='form-p'>{errors.name}</p>}
              <label for="email">Email</label>
                <input
                  className='form-input'
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className='form-p'>{errors.email}</p>}
              <label for="name">Password</label>
                <input
                  className='form-input'
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && <p className='form-p'>{errors.password}</p>}
              <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{
                    scale: 0.95,
                    backgroundColor: "#67F6E7",
                    border: "none",
                    color: "#000",
                    }}
                    type='submit'
                >
                    Sign Up
                </Button>
          </form>

      </div>

    </>
  )}

export default Signup