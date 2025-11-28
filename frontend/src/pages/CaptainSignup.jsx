import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userData,setUserData] = useState({})
    const submitHandler = (e)=>{
      e.preventDefault()
      setUserData({
        userName:{
          firstName,
          lastName
        },
        email,
        password
        }
      )
      console.log(userData)
      setFirstName('')
      setLastName('')
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
            <h3 className='text-base font-medium  mb-2'>What's your name</h3>
            <div className='flex gap-4'>
              <input type="text" placeholder='First name' required onChange={(e)=>{
                setFirstName(e.target.value)
              }} value={firstName} className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'/>
              <input type="text" placeholder='Last name' required onChange={(e)=>{
                setLastName(e.target.value)
              }} value={lastName} className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'/>
            </div>
    
            <h3 className='text-base font-medium  mb-2'>What's your email</h3>
            <input type="email" placeholder='Your email' required onChange={(e)=>{
                setEmail(e.target.value)
              }} value={email} className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>
    
            <h3 className='text-base font-medium  mb-2'>Enter Password</h3>
            <input type="password" placeholder='Your password' required onChange={(e)=>{
                setPassword(e.target.value)
              }} value={password} className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>
    
            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
    
            <p className='text-center'>Already have a account?<Link className='text-blue-600 ' to='/captain-login'> Login here</Link></p>
          </form>
          </div>
          <div>
            <p className='text-xs leading-tight'>
              By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided. This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </div>
  )
}

export default CaptainSignup