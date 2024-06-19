import React from 'react'

const UserProfile = ({params}: any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 text-3xl'>
        <h1>This is my </h1>
        <hr />
        <p className='text-4xl mt-4'>Profile Page 
        <span className='p-2 rounded bg-orange-500 text-black ml-2 cursor-pointer'>{params.id}</span>
         </p>       
    </div>
  )
}

export default UserProfile