import './Home.css';
import VNMap from './Map';
import React, { useState } from 'react';
import BookingService from '../server/BookingService';

let newBook = new BookingService();
export default function HomePage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                throw new Error('Failed to login');
            }
    
            const data = await response.json();
            localStorage.setItem('token', JSON.stringify(data)); // Convert data to a JSON string before storing
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const parsedToken = JSON.parse(storedToken);
                const tokenValue = parsedToken.token;
                if (tokenValue) {
                    console.log("Token found:", tokenValue);
                } else {
                    console.log("Token value not found.");
                }
            } else {
                console.log("Token not found in local storage.");
            }


        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    return (
        <>
            <main className = "bg-light-green">
            <a href='/homepage'>
                asdasd
            </a>
                <VNMap></VNMap>
                <form className="absolute mx-4 my-28" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </form>
            </main>
            
        </>
    );
}
