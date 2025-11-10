import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { IoClose } from 'react-icons/io5'
import profile from '../assets/images.png'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, onlineUsers } = useContext(UserContext)
  if (!selectedUser) return null

  return (
    <div className='p-2.5 w-full  border-b border-base-300'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='size-10 rounded-full relative'>
              <img
                className='size-10 object-cover rounded-full'
                src={selectedUser.proPic || profile}
                alt={selectedUser.name}
              />
            </div>
          </div>

          <div>
            <h2 className='font-medium'>{selectedUser.name}</h2>
            <p className='text-sm text-base-content/70'>
              {onlineUsers?.includes(selectedUser._id) ? 'online' : 'offline'}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} className="mr-2 hover:text-red-500">
          <IoClose size={22}/>
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
