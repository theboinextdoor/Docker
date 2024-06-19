"use client"
import React , {useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const ProfilePage = () => {
  const router = useRouter();
  const [data , setData] = useState("nothing")
  const handleLogOutButton =  async () => {
    try{
      const response = await axios.get('/api/users/logout') 
      console.log(response.data)
      toast.success("Logout Successfully")
      router.push("/login")
    }catch(error:any){
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const getUserDetails = async() => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data.username)
  }

  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 text-2xl'>
        <h1>This is my </h1>
        <hr />
        <p>Profile Page </p>
        <h2 className="p-3 rounded bg-green-400 mt-3">{data === "nothing" ? "Nothing"  : <Link href={`/profile/${data}`} >{data}</Link>}</h2>

        <hr />
        <button 
          onClick={handleLogOutButton}
          type="button"
          className="bg-blue-500 hover:bg-blue-600 py-2 px-2 mt-2
           rounded-lg"
        >Logout</button>
        <button 
          onClick={getUserDetails}
          type="button"
          className="bg-cyan-500 hover:bg-cyan-600 py-2 px-2 mt-2
           rounded-lg"
        >Get User Details</button>
        
    </div> 
  )
}

export default ProfilePage