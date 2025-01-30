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
      const response = await axios.post(`${api}/login/`, credentials)
      localStorage.setItem('token', response.data.access)
      navigate('/main')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
