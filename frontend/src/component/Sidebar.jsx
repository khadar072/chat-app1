import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { FaUser } from 'react-icons/fa'
import profile from '../assets/images.png'
const Sidebar = () => {
  const { getUsers, onlineUsers , users, selectedUser, setSelectedUser } = useContext(UserContext)
  
  useEffect(()=>{
    getUsers()
  },[getUsers])
  return (
    <div>
      <aside className='w-28  lg:w-72 border-r border-base-300 flex flex-col transition-all  duration-300'>
        <div className='border-b border-base-300 w-full p-5'>
          <div className='flex items-center gap-2'>
            <FaUser className='size-6' />
            <span className='font-medium hidden lg:block'> Contacts</span>
          </div>
          <div className='overflow-y-auto w-full py-5 h-screen'>
            {
              users.map((user) => (
                <button onClick={() => setSelectedUser(user)} key={user._id} className={` w-full p-3 flex rounded-2xl items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user?._id ? 'bg-base-300 ring-base-300  ring-1' : ''} `}>
                  <div className='relative m-auto lg:m-0'>
                    <img src={user.propic || profile} alt="" className='size-12 object- rounded-full' />
                    {
                      onlineUsers.includes(user._id) && <div className='bottom-0 right-0 bg-green-700 rounded-full size-3 ring-2 ring-zinc-900 absolute'></div>
                    }
                    {/* <FaUser className="size-5" /> */}
                  </div>

                  <div className=' hidden lg:block text-left min-w-0'>
                    <div className='font-medium truncate'>
                      {user.name}
                    </div>
                    <div className='text-sm text-zinc-400'>
                      {
                        onlineUsers.includes(user._id) ? 'online' : 'offline'
                      }
                    </div>
                  </div>
                </button>
              ))
            }
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar