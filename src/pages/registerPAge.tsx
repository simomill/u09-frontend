import React from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-4'>
      <h1 className='font-bold text-3xl mb-6 text-cyan-900'>DSPLAY</h1>

      <input className='border rounded py-2 px-3 mb-3' type="text" name="" id="" placeholder='name' />
      
      <input className='border rounded py-2 px-3 mb-3' type="email" name="" id="" placeholder='email' />
      
      <input className='border rounded py-2 px-3 mb-3' type="text" name="" id=""  placeholder='username'/>
      
      <input className='border rounded py-2 px-3 mb-3' type="password" name="" id="" placeholder='password' />
      
      <input className='border rounded py-2 px-3 mb-3' type="password" name="" id="" placeholder='repeat password' />
      
      <input className='border rounded py-2 px-3 bg-slate-50' type="submit" value="register" />
      
      <Link to={'/login'} className='text-cyan-900'>Already a user?</Link>
    </div>
  )
}

export default RegisterPage