import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-4'>
      <h1 className='font-bold text-3xl mb-6 text-cyan-900'>DSPLAY</h1>

      <input className='border rounded py-2 px-3 mb-3' type="text" name="" id=""  placeholder='username'/>
      <input className='border rounded py-2 px-3 mb-3' type="password" name="" id="" placeholder='password'/>
      <input className='border rounded py-2 px-3 bg-slate-50' type="submit" value="login" />
      
      <Link to={'/register'} className='text-cyan-900'>register</Link>
    </div>
  )
}

export default LoginPage