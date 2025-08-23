import { useState,useEffect } from 'react'
import {login,logout} from './store/authSlice'
import{useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {Header,Footer, Signup,Login} from './components/index'
import { Outlet } from 'react-router-dom'
function App() {
 
// const[loading,setLoading]= useState(true)
// const dispatch = useDispatch()

// useEffect(() => {
//     authService.getCurrentUser()
//     .then((userData)=>{
//         if(userData){
//           dispatch(login({userData}))
//         }
//         else{
//           dispatch(logout())
//         }
//     }
//   )
//   .finally(()=>setLoading(false))
// }, [])

   return (
    <>
    <Header />
    <main className="min-h-[calc(100vh-4rem)]">
      <Outlet />
    </main>
    </>
   )
  
}

export default App
