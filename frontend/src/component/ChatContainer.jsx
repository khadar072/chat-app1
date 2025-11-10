import React, { useContext, useEffect, useRef } from 'react'
import { UserContext } from '../context/UserContext'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import { formatMessageTime } from '../utils/utils'
import profile from '../assets/images.png'

const ChatContainer = () => {
    const { getMessages, author, messages, selectedUser, subscripeToMessage, unSubscripeToMessage } = useContext(UserContext)
    // const messageEndRef = useRef(null)

    // Fetch messages when selectedUser changes
    useEffect(() => {
         if (!selectedUser?._id) return;
        getMessages(selectedUser._id)
        subscripeToMessage();
        return () => unSubscripeToMessage()
    }, [selectedUser._id,unSubscripeToMessage,subscripeToMessage])

// useEffect(()=>{
//     messageEndRef.current.scrollIntoView({behavior:'smooth'})
// },[messages])

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />

            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((message) => (
                    <div key={message._id}
                        className={`chat ${message.senderId === author?._id ? 'chat-end' : 'chat-start'}`}
                        // ref={messageEndRef}
                    >
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full border'>
                                <img src={message.senderId === author?._id ? author?.propic || profile : selectedUser?.propic || profile} alt="" />
                            </div>
                        </div>
                        <div className='chat-header mb-1'>
                            <time className='text-sm opacity-50 ml-1'>{formatMessageTime(message.createdAt)}</time>
                        </div>
                        <div className='chat-bubble flex flex-col'>
                            {
                                message.image && (
                                    <img src={message.image} alt="" className='sm:max-w-[200px] rounded-2xl mb-2' />
                                )
                            }
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <ChatInput />
        </div>
    )
}

export default ChatContainer
