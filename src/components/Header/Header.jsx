import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
function Header() {
const navigate = useNavigate()
if(!useSelector((state)=>state.auth.userData)){
  navigate('/Login')
}
const NavList = [{
    
}]

  return (
    <div>Header</div>
  )
}

export default Header