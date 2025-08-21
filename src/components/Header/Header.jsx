import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import{Button, Logo, Container,UserPic} from '../index'
import { Link } from 'react-router-dom'

function Header() {
const navigate = useNavigate()
if(!useSelector((state)=>state.auth.userData)){
  navigate('/Login')
}
const navList = [{
    name: "Home",
    path: "/"
  },
  {
    name: "Share Item",
    path: "/Share-Item"
  },
]

  return (
  <header className="bg-white shadow-md sticky top-0 z-50">
    <Container className="px-0">   
      <nav className="flex items-center justify-between py-4">
        
        
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <Logo className="h-10 w-10" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#00C2B8] via-[#5A86D9] to-[#9A63E0] bg-clip-text text-transparent">
            GiveNGrab
          </h1>
        </Link>
        
        {/* Right - Nav + UserPic */}
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navList.map((list) => (
              <li key={list.name}>
                <Button onClick={() => navigate(list.path)}>
                  {list.name}
                </Button>
              </li>
            ))}
          </ul>

          <Link to="/Profile">
            <UserPic />
          </Link>
        </div>
      </nav>
    </Container>
  </header>
);
}

export default Header