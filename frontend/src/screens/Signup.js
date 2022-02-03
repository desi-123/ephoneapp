import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Erorr from '../components/Error'
import Loading from '../components/Loading'
import { signup } from '../redux/action/user'

const Signup = ({ location, history }) => {
 const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector((state) => state.userSignup)

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, redirect, history])
  const submitSignup = (e) => {
    e.preventDefault()
    dispatch(signup(name, email, password))
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Erorr />
  }

  return (
    <div className='form'>
      <h2>Sign up</h2>
      <form onSubmit={submitSignup}>
        <div className="form__label">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form__label">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__label">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-sign-up">
          Sign up
        </button>
      </form>
      <div className="redirect">
        Already have an accout? 
        <Link to={redirect ? `/login? redirect=${redirect}` : '/login'}> {''}
          <strong>Sign in</strong>
        </Link>
      </div>
    </div>
  )
}

export default Signup
