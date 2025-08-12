import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h1>About Page</h1>
        <button className="bg-blue-400 rounded-2xl p-4 cursor-pointer" onClick={()=> navigate("/")}>Go to homepage</button>
    </div>
  )
}

export default About