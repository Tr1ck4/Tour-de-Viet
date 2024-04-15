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
