import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/userContext'

const UserLogin = () => {
  const [email,setEmail] =  useState('')
  const [password,setPassword] =  useState('')
  // const [userData,setUserData] = useState({})
  const {user,setUser} = React.useContext(UserDataContext)
  const navigate = useNavigate()
  const submitHandler = async (e)=>{
    e.preventDefault();
    const newUser = {
      email,
      password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,newUser)
      if(response.status === 200){
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token',data.token)
        navigate('/home')
      }
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error.response?.data)
    }
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-22 h-12 ml-0 mb-10 rounded' src='https://imgs.search.brave.com/AE-5-1MuVyC6kalBtX6eptghTrDhJnq4rAOJqZtPmQ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM1LzAx/L2Y1LzM1MDFmNTBk/ZWE4MTI2ZWUwM2Zi/OTE3NmM0ZGFlMmRh/LmpwZw'></img>
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

        <p className='text-center'>New here?<Link className='text-blue-600 ' to='/signup'>Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center  text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Signin as a Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin