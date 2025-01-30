import { useState } from 'react'
import { useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import "./styles/SignUp.css"

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
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-header">
          <h1 className="signup-title">Create your Account</h1>
          <p className="signup-subtitle">to continue to Medigem</p>
        </div>
        <div className="signup-inputs">
          <input
            className="signup-input"
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({...userData, username: e.target.value})}
          />
          <input
            className="signup-input"
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
          />
          <div className="password-inputs">
            <input
              className="signup-input"
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value})}
            />
            <input
              className="signup-input"
              type="password"
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
            />
          </div>
        </div>
        <button className="signup-button" type="submit">Create Account</button>
      </form>
      <p>Already have an account? <Link to="/login">Sign in</Link> </p>
    </div>
  )
}

export default SignUp
