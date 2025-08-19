import React from 'react'
import { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link,NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import {login,logout} from '../store/authSlice'
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
                if(userData) dispatch(authLogin(userData))
                navigate('/')
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please try again."); //custome error messages
        }
    }
    const EmailLogin = (data) => handleLogin(() => authService.login(data));
    const GoogleLogin = () => handleLogin(() => authService.GoogleLogin());
    const GithubLogin = () => handleLogin(() => authService.GithubLogin());
  return (
    <div>
        Login Page CSS
    </div>
  )
}

export default Login