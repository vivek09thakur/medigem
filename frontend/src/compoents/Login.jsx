import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const navigate = useNavigate()
  const api = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${api}/api/auth/login/`, credentials)
      localStorage.setItem('token', response.data.access)
      navigate('/main')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-8 border rounded shadow-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          className="block mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
