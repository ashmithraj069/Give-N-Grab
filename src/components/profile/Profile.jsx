import React, { useEffect, useState, useRef } from 'react'
import { GrabbedItems, Logoutbtn, MyItems } from './index'
import{UserPic} from '../index'

function Profile() {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleDropDown = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDropDown);
    return () => document.removeEventListener("mousedown", handleDropDown);
  }, []);

  return (
    <div className="relative" ref={dropDownRef}>
      
      <UserPic onClick={() => setOpen(!open)} />
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border p-2 z-50">
          <ul className="flex flex-col gap-2">
            <li><GrabbedItems /></li>            
            <li><MyItems /></li>
            <li><Logoutbtn /></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
