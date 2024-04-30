import background from './images/background.png'
import wave_up from './images/waveup.png'
import wave_down from './images/wavedown.png'

import './Profile.css'
import { useEffect } from 'react'
import {useState} from 'react'
import AccountService from '../server/AccountService'
function ProfilePage() {
    const [profile,setProfile] = useState({
        name: '',
        age: '',
        telNum: '',
        address:'',
        email:'',
        citizenID:'',
        userName:'',
        password:''
    });
    const accountService = new AccountService();
    useEffect(() => {
        
        const userName = 'exampleUser'; // or fetch it dynamically
        const AccountPromise = accountService.fetchAccount(userName);
    
        AccountPromise.then(account => {
            // console.log('Fetched accounts:', account); // Add this line to verify the fetched bookings
            setProfile(account);
        }).catch(error => {
            console.error('Error fetching account:', error);
        });
    },[]);
    const handleSumit = async(event)=>{
        event.preventDefault();
        try {
            await accountService.updateAccount(profile); // Call updateAccount() with profile
            console.log('Profile updated successfully!');
            // Handle successful update (e.g., clear form, show confirmation)
          } catch (error) {
            console.error('Error updating profile:', error);
            // Handle errors (e.g., display error message to user)
          }
    }
    const handleChange = (event) => {
        const { id, value } = event.target;
        setProfile((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    

    
    return (
        <div className='relative h-screen overflow-hidden'>
            <div>
                <img src={background} alt="" />
                <img src={wave_up} alt="" className='absolute left-0 top-0' />
                <img src={wave_down} alt="" className='absolute right-0 bottom-0' />
            </div>
            <div className='absolute h-3/4 w-1/3 backdrop-blur-md rounded-xl inset-0 ml-32  my-auto bg-white/10 shadow-lg font-Itim'>
                <form className='mt-10 text-3xl text-black ml-10 grid grid-cols-3 gap-5' > 
                    <label className=''> 
                        Name:
                    </label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="name" defaultValue={profile.name} onChange={handleChange}/>
                    <label className=''> 
                        Age:  
                    </label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="age" defaultValue={profile.age} onChange={handleChange}/>
                    <label className=''> 
                        Tel: 
                    </label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="telNum" defaultValue={profile.telNum} onChange={handleChange}/>
                    <label className=''> 
                        Address: 
                        
                    </label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="address" defaultValue={profile.address} onChange={handleChange}/>
                    <label className=''> 
                        Email: 
                        
                    </label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="email" defaultValue={profile.email} onChange={handleChange}/>
                    <label className=''> 
                        CitizenID: 
                        
                    </label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="citizenID" defaultValue={profile.citizenID} onChange={handleChange}/>
                    <label className=''> 
                        Username: 
                        
                    </label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="name" readOnly={true}  defaultValue={profile.userName} onChange={handleChange}/>
                    <label className=''> 
                        Password: 
                        
                    </label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="name" defaultValue={profile.password} onChange={handleChange}/>
                    
                </form>
                <button className='bg-light-green w-4/5 h-14 ml-16 mt-5 text-black text-2xl' onClick={handleSumit}>
                    Update Info
                </button>
            </div>
        </div>
    )
}

export default ProfilePage