import React, { useState } from 'react';
import './LoginPopUp.css';
import AccountService from '../../server/AccountService';


const LoginPopUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newAccount = new AccountService();
        try {
            const res = await newAccount.login(username, password);
            window.location.reload();
        }
        catch (err) {
            alert('Login failed', err.message);
        }

    };
    return (
        <div className=' fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center' style={{ zIndex: 9999 }}>
            <div className='w-[400px] h-[300px] backdrop-blur-lg drop-shadow-xl bg-bone-white bg-opacity-10 shadow-lg stroke-rgba(255, 255, 255, 1) rounded-2xl'>
                <div className='my-8'>
                    <form className='' onSubmit={handleSubmit}>
                        <div className='w-3/4 bg-bone-white h-[60px] mx-auto rounded-2xl'>
                            <input className='formInput' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='w-3/4 bg-bone-white h-[60px] mx-auto rounded-2xl my-6'>
                            <input className='formInput' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='w-2/5 bg-bone-white h-[60px] mx-auto rounded-2xl font-itim button' type="submit" onClick={handleSubmit}>Login</button>
                    </form>
                    {/* <div className='w-3/4 bg-bone-white h-[60px] mx-auto rounded-2xl'></div>
                    <div className='w-3/4 bg-bone-white h-[60px] mx-auto rounded-2xl my-5'></div>
                    <div className='w-2/5 bg-bone-white h-[60px] mx-auto rounded-2xl'></div> */}
                </div>
            </div>
        </div>
    )
}

export default LoginPopUp;