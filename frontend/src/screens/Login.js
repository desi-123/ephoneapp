import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Erorr from '../components/Error';
import Loading from '../components/Loading';
import { login } from '../redux/action/user';

const Login = ({location, history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const { loading, error, userInfo } = useSelector((state) => state.userLogin)
    

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, redirect, history])
    const submitLogin = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Erorr />
    }

    return (
        <div className='form'>
            <h2>Sign In</h2>
            <form onSubmit={submitLogin}>
                <div className="form__label">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id='email' 
                        placeholder='Enter Email' 
                        value={email}
                        onChange={(e) => (setEmail(e.target.value))}
                        />
                </div>
                <div className="form__label">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id='password' 
                        placeholder='Enter password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </div>
                <button type='submit' className="btn btn-sign-in">Sign In</button>
            </form>
            <div className="redirect">
                Don't have an accout yet? 
                <Link to={redirect ? `/signup? redirect=${redirect}` : '/signup'} >

                <strong>Sign up</strong> instead
                </Link>
            </div>
        </div>
    )
}

export default Login
