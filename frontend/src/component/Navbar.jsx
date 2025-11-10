import React, { useContext } from 'react'
import { FaRocketchat } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const navigator = useNavigate()
  
  const {token,setToken,setAuthor,setSocket,socket,disconnectSocket} = useContext(UserContext)


const handleLagout = () => {
  if (socket) socket.disconnect();
  setSocket(null);
  setToken("");
  setAuthor(null);
  disconnectSocket()
  localStorage.removeItem("token");
  navigator("/login");
};

  return (
    <div className='flex flex-row h-20 w-full  px-6 lg:px-28 justify-between items-center '>
      <FaRocketchat onClick={()=>navigator('/')} size={60} className='cursor-pointer' />
      <ul className='flex gap-6 '>
        <li onClick={()=>navigator('/setting')} className=' flex cursor-pointer flex-row justify-center items-center gap-2'><CiSettings size={25} /><p className='hidden lg:block'>Setting</p></li>
        <li onClick={()=>navigator('/profile')} className=' flex cursor-pointer flex-row justify-center items-center gap-2'><IoPersonAddOutline size={20} /><p className='hidden lg:block'>profile</p></li>
        {
          token && <li onClick={handleLagout} className=' flex cursor-pointer flex-row justify-center items-center gap-2'> <CiLogout size={20} /><p className='hidden lg:block'>logout</p></li>
        }
      </ul>
    </div>
  )
}

export default Navbar