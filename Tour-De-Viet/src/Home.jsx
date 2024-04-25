import './Home.css';
import VNMap from './Map';
import React, { useState } from 'react';
import BookingService from '../server/BookingService';
import AccountService from '../server/AccountService';

let newBook = new BookingService();
let newAccount = new AccountService();
export default function HomePage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        await newAccount.login(username, password);
    };

    return (
        <>
            <main className="bg-light-green">
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
