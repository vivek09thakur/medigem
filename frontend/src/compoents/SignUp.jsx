import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  const api = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      await axios.post(`${api}/register/`, {
        username: userData.username,
        email: userData.email,
        password: userData.password
      })
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-8 border rounded shadow-lg">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserData({...userData, username: e.target.value})}
          className="block mb-2 p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUserData({...userData, email: e.target.value})}
          className="block mb-2 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUserData({...userData, password: e.target.value})}
          className="block mb-2 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
          className="block mb-4 p-2 border rounded w-full"
        />
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
