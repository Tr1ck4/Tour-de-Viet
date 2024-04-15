import './Home.css';
import VNMap from './Map';
import React, { useState } from 'react';

export default function HomePage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                // Handle failed login
                console.error('Login failed:', response.statusText);
                return;
            }

            const data = await response.json();
            const token = data.token;

            localStorage.setItem('token', token);

            // Optionally, redirect user to another page
            // window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error during login:', error);
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
