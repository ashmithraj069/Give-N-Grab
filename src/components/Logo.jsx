import React from 'react'
import logo from '../assets/logo.png'
function Logo({
  className = '',
}) {
  return (
    <div className={className}>
      <img src={logo} alt="Logo" />
    </div>
  )
}

export default Logo