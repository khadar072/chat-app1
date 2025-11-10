import React, { useContext } from 'react'
import Sidebar from '../component/Sidebar'
import { UserContext } from '../context/UserContext'
import NoChatContainer from '../component/NoChatContainer'
import ChatContainer from '../component/ChatContainer'

const HomePage = () => {
  const {selectedUser} = useContext(UserContext)
  return (
    <div className=' max-h-screen bg-base-200'>
        <div className='flex items-center justify-center py-6 px-4'>
          <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-7xl h-[calc(100vh-8rem)]'>
            <div className='flex h-full rounded-lg overflow-hidden'>
              <Sidebar/>
              {
                  selectedUser ?<ChatContainer/>:<NoChatContainer/>
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomePage