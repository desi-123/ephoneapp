import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Erorr from '../components/Error'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../redux/action/user'

const Profile = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()
  const { loading, error, user } = useSelector((state) => state.userDetails)

    const { userInfo } = useSelector((state) => state.userLogin)

        const { success } = useSelector((state) => state.userUpdate)

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, user, userInfo, history])
  const submitSignup = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile({ id: user._id, name, email, password}))
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Erorr />
  }

  if (success) {
    return <Message />
  }
  return (
    <div className="form">
    <h5 className='update-title'>update user</h5>
      <form onSubmit={submitSignup}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="name"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-update">
          update
        </button>
      </form>
    </div>
  )
}

export default Profile
