import React, { useRef, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
// const LOGIN_URL = 'http://localhost:8000/api/login/'
const LOGIN_URL = 'https://evahluk-restful-apis.onrender.com/api/login/'

const ChefLogin = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUser] = useState('')
  const [password, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Data to be posted:', { username, password })
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.token
      const user_profile_data = response?.data?.user_profile_data
      const isChef = response?.data?.user_profile_data?.is_chef
      const isUsername = response?.data?.user_profile_data?.username
      localStorage.setItem('username', isUsername)
      localStorage.setItem('token', accessToken)
      console.log('Access Token:', accessToken)
      console.log('Role:', isChef)
      console.log('User Profile Data:', user_profile_data)
      setAuth({
        isUsername,
        password,
        isChef,
        accessToken,
        user_profile_data,
        roles: ['isChef']
      })
      setUser('')
      setPwd('')
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'You wil be directed to your dashboard.'
      }).then(() => {
        if (isChef) {
          console.log('Redirecting to /chefdashboard')
          navigate('/chefsidebar')
        } else {
          console.log('Redirecting to /cheflogin')
          navigate('/chefLogin')
        }
      })

      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Wrong username or password')
      }
      errRef.current.focus()
    }
  }

  return (
        <section>
            <p
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h1>Sign In As Chef</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?
                <br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
  )
}

export default ChefLogin
