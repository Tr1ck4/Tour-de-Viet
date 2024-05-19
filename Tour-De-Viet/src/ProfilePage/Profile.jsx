import background from '.././images/background.png'
import wave_up from '.././images/waveup.png'
import wave_down from '.././images/wavedown.png'

import './Profile.css'
import { useEffect } from 'react'
import {useState} from 'react'

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
    
    useEffect(()=>{
        fetch('http://localhost:3000/api/accounts/info')
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                setProfile(data);
            })
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const requestOptions = {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(profile), 
        };
    
        try {
          const response = await fetch('http://localhost:3000/api/accounts/info', requestOptions);
    
          if (response.ok) {
            const responseData = await response.json();
            console.log('Data updated successfully:', responseData);
            // You might want to reset the form, show a success message, etc.
          } else {
            console.error('Failed to update data:', response.status);
          }
        } catch (error) {
          console.error('Error while updating data:', error);
        }
      };
    const handleChange = (event) => {
        const { id, value } = event.target;
        setProfile((prevState) => ({
            ...prevState,
            [id]: value,
        }));
        console.log(profile);
    };
    return (
        <main>
            <div className='relative h-screen overflow-hidden'>
            <div>
                <img src={background} alt="" />
                <img src={wave_up} alt="" className='absolute left-0 top-0' />
                <img src={wave_down} alt="" className='absolute right-0 bottom-0' />
            </div>
            <div className='absolute h-3/4 w-1/3 backdrop-blur-md rounded-xl inset-0 ml-32 my-auto bg-white/10 shadow-lg font-itim' >
                <form className='mt-10 text-3xl text-black ml-10 mr-5 grid grid-cols-3 gap-5'onSubmit={handleSubmit} > 
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
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="userName" defaultValue={profile.userName} onChange={handleChange}/>
                    <label className=''> 
                        Password: 
                        
                    </label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="password" defaultValue={profile.password} onChange={handleChange}/>
                    <button className='bg-light-green  mr-7 h-14 text-black text-2xl col-start-2' type='submit'>
                        Update
                    </button >

                </form>

            </div>
        </div>
        </main>
        
        
    )
}

export default ProfilePage