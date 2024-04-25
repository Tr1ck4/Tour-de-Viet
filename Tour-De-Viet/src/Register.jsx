import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from './assets/Background/RegisterPage_bg.png';
export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.name || !formData.password || !formData.username) {
            alert('Please enter all the field');
            return;
        }
        try {
            let name = formData.name, username = formData.username, email = formData.email, password = formData.password;
            const response = await axios.post('http://localhost:3000/api/accounts', {
                username,
                password,
                name,
                email,
            });

            if (response.data.message = 'Account created') {
                alert(response.data.message)
                navigate('/homepage')
            } else {
                alert(response.data.message)
            }

        } catch (err) {
            console.error('Error during register request:', err);
        }
    };

    return (
        <>
            <main className='bg-fixed bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                <div className='mt-36 ml-32 sm:w-[200px] sm:h-[400px] lg:w-[500px] lg:h-[700px] backdrop-blur-lg drop-shadow-xl bg-bone-white bg-opacity-10 shadow-sm shadow-bone-white rounded-lg'>
                    <div className='w-full mt-8 mb-10'>
                        <h1 className='font-itim text-center font-semibold text-5xl'>WEBSITE NAME</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='sm:w-[100px] lg:w-[400px] mx-auto mb-10'>
                            <input
                                placeholder='Username'
                                className='input'
                                name='username'
                                id='username'
                                type='text'
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='sm:w-[100px] lg:w-[400px] mx-auto mb-10'>
                            <input
                                placeholder='Password'
                                className='input'
                                name='password'
                                id='password'
                                type='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='sm:w-[100px] lg:w-[400px] mx-auto mb-10'>
                            <input
                                placeholder='Name'
                                className='input'
                                name='name'
                                id='name'
                                type='text'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='sm:w-[100px] lg:w-[400px] mx-auto mb-10'>
                            <input
                                placeholder='Email'
                                className='input'
                                name='email'
                                id='email'
                                type='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='sm:w-[100px] lg:w-[400px] mx-auto mb-10 flex justify-center '>
                            <button type='submit' className='button font-itim'>Register</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}


{/* <div>
                            <label htmlFor='username'>Username:</label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password:</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Email:</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor='name'>Name:</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div> */}