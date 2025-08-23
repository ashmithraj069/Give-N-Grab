import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { Link,NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import {login,logout} from '../store/authSlice'
import {Logo,Button} from './index'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const{register,handleSubmit}=useForm()
    const[error,setError]=useState('')
    // const  EmailLogin = async(data)=>{
    //     setError("")
    //     try {
    //         const session = await authService.login(data)
    //         console.log("session:", session);
            
    //         if(session) {
    //             const userData= await authService.getCurrentUser()
    //             if(userData) dispatch(authLogin(userData))
    //                 navigate('/')
    //         }
            
    //     } catch (error) {
    //         setError(error.message)
    //     }
    // }
    // const GoogleLogin = async () => {
    //             try {
    //                 const session = await authService.GoogleLogin()
    //                 console.log("session:", session);
    //                 if(session) {
    //                     const userData = await authService.getCurrentUser()
    //                     if(userData) dispatch(authLogin(userData))
    //                     navigate('/')
    //                 }
    //             } catch (error) {
    //                 setError(error.message)
    //             }
    //         }
    // const GithubLogin = async()=>{
    //     setError("")
    //     try {
    //         const session = await authService.GithubLogin()
    //         console.log("session:", session);
    //         if(session) {
    //             const userData = await authService.getCurrentUser()
    //             if(userData) dispatch(authLogin(userData))
    //             navigate('/')
    //         }
    //     } catch (error) {
    //         setError(error.message)
    //     }
    // }
    const handleLogin = async (loginData)=>{
        setError("")
        try {
            const session = await authService.login(loginData)
            console.log("session:", session);
            if(session) {
                const userData = await authService.getCurrentUser()
                console.log("User data:", userData);
                if(userData) dispatch(authLogin(userData))
                  
                navigate('/')
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please try again."); //custome error messages
        }
    }
    const EmailLogin = (data) => handleLogin(() => authService.login(data));
    const GoogleLogin = () => handleLogin(() => authService.GoogleLogin()
  );
    const GithubLogin = () => handleLogin(() => authService.GithubLogin());
  return (
    <div className="min-h-screen py-4 bg-gray-50">
      
      

      {/* Signup box */}
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-md">
      
        <h2 className="relative flex items-center mb-6 text-3xl font-bold">
  
  <Logo className="w-12 h-12" />

  
  <span className="absolute left-1/2 -translate-x-1/2">Login</span>
</h2>



        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">    
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" className="w-full">Sign In</Button>

          <div className="flex items-center gap-2 my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <Button type="button"  onClick={() => authService.GoogleLogin()} className="w-full cursor-pointer">
            Continue with Google
          </Button>

          <Button type="button" onClick={() => authService.GithubLogin()} className="w-full cursor-pointer">
            Continue with GitHub
          </Button>
        </form>
        </div>
</div>
  )
}

export default Login