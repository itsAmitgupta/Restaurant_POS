import React,{useState, useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import Logo from '../assets/Logo.png'
import Admin from '../assets/admin.jpg'
import axios from "axios"
import { TableContext } from '../Context/TableContextProvider';
function Navbar() {
  const [logintab, setlogin] = useState(false)
  const {login} = useContext(TableContext)
    const navigate = useNavigate()
    const onLogout = async () =>{
        const response = await axios.get("http://localhost:3000/api/v1/logoutuser")
        console.log(response.data)
        localStorage.removeItem('user');
        navigate("/login")
    }

    return (
    <div className='w-full h-20 shadow-lg'>
        <div className='w-full h-full flex justify-between items-center'>
            <div className='w-20 h-18 mx-5 cursor-pointer'>
                <img src={Logo} alt='Logo'/>
            </div>
            <div className={`mr-[350px] cursor-pointer md:block hidden`}>
                <div className='relative w-[350px]'>
                <input className='w-full h-10 rounded-xl font-xl py-[5px] pl-[30px] px-[20px] outline-none border border-gray-400' placeholder='Search here' type="search"/>
                <FaSearch className='absolute top-3 left-3' color='gray' />
                </div>
            </div>
            <div className='cursor-pointer mx-5'>
                <div className='flex gap-3'>
                    <img className='w-15 h-10 rounded-full object-cover bg-center' src={Admin} alt="Admin image" />
                    <div className='relative' onClick={()=>setlogin(!logintab)}>
                        <p className='font-bold text-xl text-[#265073]'>{login.user.name}</p>
                        <p className='font-light text-[#2D9596] text-sm'>{login.user.role}</p>
                        { logintab?<div className=' bg-gray-300 w-36 shadow-lg duration-500 absolute top-12 right-1 z-50'>
                            <p className='text-md font-semibold hover:text-indigo-700 tracking-wide cursor-pointer'>Change Password</p>
                            <p className='text-md font-semibold hover:text-indigo-700 tracking-wide cursor-pointer' onClick={onLogout}>Logout</p>
                        </div>:''}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar