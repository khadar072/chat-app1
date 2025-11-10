import React from 'react'
import { FiMessageSquare } from "react-icons/fi";

const NoChatContainer = () => {
    return (
        <div className='flex flex-1 w-full flex-col justify-center items-center p-16 bg-base-100/50'>
            <div className='max-w-md space-y-6 text-center'>
                {/* icon display */}
                <div className='flex justify-center gap-4 mb-4'>
                    <div className=' relative'>
                        <div className='w-16 h-16 animate-bounce rounded-2xl bg-primary/10 flex justify-center items-center'>
                            <FiMessageSquare className='w-8 h-8 text-primary' />
                        </div>
                    </div>
                </div>
                {/* messages */}
                <h2 className='text-2xl font-bold'>Welcome To Chatty!</h2>
                <p className='text-base-content/60'>select a conversation from side to chatty!</p>
            </div>
        </div>
    )
}

export default NoChatContainer