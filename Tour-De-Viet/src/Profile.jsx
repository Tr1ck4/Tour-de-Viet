import background from './images/background.png'
import wave_up from './images/waveup.png'
import wave_down from './images/wavedown.png'

import './Profile.css'
import { useEffect } from 'react'
import {useState} from 'react'

function ProfilePage() {
    const [profile,setProfile] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3000/api/accounts/exampleUser')
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                setProfile(data);
            })
    })
    return (
        <div className='relative'>
            <div>
                <img src={background} alt="" />
                <img src={wave_up} alt="" className='absolute left-0 top-0' />
                <img src={wave_down} alt="" className='absolute right-0 bottom-0' />
            </div>
            <div className='absolute h-2/3 w-1/3 backdrop-blur-md rounded-xl inset-0 ml-32 my-auto bg-white/10 shadow-lg font-Itim'>
                <form className='mt-10 text-2xl text-black ml-10 grid grid-cols-3 gap-5' > 
                    <label className=''> 
                        Name:
                    </label>
                    <input className='bg-white text-black h-10 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" name="name" placeholder={profile.name}/>
                    <label className=''> 
                        Age:  
                    </label>
                    <input className='bg-white text-black h-10 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" name="name" placeholder={profile.age}/>
                    <label className=''> 
                        Tel: 
                    </label>
                    <input className='bg-white text-black h-10 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" name="name" placeholder={profile.telNum}/>
                    <label className=''> 
                        Address: 
                        
                    </label>
                    <input className='bg-white text-black h-10 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" name="name" placeholder={profile.address}/>
                    <label className=''> 
                        Email: 
                        
                    </label>
                    <input className='bg-white text-black h-10 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" name="name" placeholder={profile.email}/>
                    <label className=''> 
                        CitizenID: 
                        
                    </label>
                    <input className='bg-white text-black h-10 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" name="name" placeholder={profile.citizenID}/>
                    <label className=''> 
                        Username: 
                        
                    </label>
                    <input className='bg-white text-black h-10 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" name="name" placeholder={profile.userName}/>
                    <label className=''> 
                        Password: 
                        
                    </label>
                    <input className='bg-white text-black h-10 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" name="name" placeholder={profile.password}/>
                </form>
            </div>
        </div>
    )
}

export default ProfilePage