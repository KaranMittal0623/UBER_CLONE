import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const [email,setEmail] =  useState('')
    const [password,setPassword] =  useState('')
    const {captain,setCaptain} = React.useContext(CaptainDataContext)
    const navigate = useNavigate()
    
    const submitHandler = async (e)=>{
      e.preventDefault();
      const captain={
        email,
        password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)
      if(response.status === 200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      }
      console.log(captain)
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