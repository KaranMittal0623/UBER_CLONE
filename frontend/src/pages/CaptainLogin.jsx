import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email,setEmail] =  useState('')
    const [password,setPassword] =  useState('')
    const [captainData,setCaptainData] = useState({})
    const submitHandler = (e)=>{
      e.preventDefault();
      setCaptainData({email,password})
      console.log(captainData)
      setEmail('')
      setPassword('')
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 h-14 ml-0 mb-10 rounded' src='https://toppng.com/uploads/preview/uber-logo-png-uber-logo-2018-11563110096yltfjpzwbm.png'></img>
      <form onSubmit={(e)=>{
        submitHandler(e)

      }}>
        <h3 className='text-lg font-medium  mb-2'>What's your email</h3>
        <input type="email" placeholder='Your email' required value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>

        <h3 className='text-lg font-medium  mb-2'>Enter Password</h3>
        <input type="password" placeholder='Your password' required value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>

        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>

        <p className='text-center'>Join a fleet?<Link className='text-blue-600 ' to='/captain-signup'> Register as a Captain</Link></p>
      </form>
      </div>
      <div>
        <Link to='/login' className='bg-[#d5622d] flex items-center justify-center  text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Signin as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin