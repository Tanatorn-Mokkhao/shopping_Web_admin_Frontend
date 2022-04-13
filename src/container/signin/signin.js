/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect  } from "react"
import {BoxContainer,SigninContainer,SigninContainerLeft,SigninContainerRight } from './singin.style'
import Input from '../../component/ui/input/input' 
// import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom'
import { GlobalStyle } from '../../component/ui/globalStyle/global.style'
import { useDispatch, useSelector } from 'react-redux'
import { Login  , ResponseSuccessGoogle,ClearError} from '../../action/auth/authAction'
import { Redirect } from "react-router-dom";
import GoogleLogin from 'react-google-login'
import Loader from '../../component/loader/loader'
import { APP_BAD_REQUEST } from "../../service-share/const/bad-request.const"

function Signin(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const [errorValidate, setErrorValidate] = useState({})

    useEffect(() => {
        dispatch(ClearError())
    }, [])
    
    let error = {}
    let formIsValid = true

    const HandleValidation = () => {
        if (!username) {
            error = !error?.username ? { ...error, username: 'ระบุ' } : error
            formIsValid = false
        }
        if (!password) {
            error = !error?.password ? { ...error, password: 'ระบุ' } : error
            formIsValid = false
        }
        setErrorValidate(error)
    }
    
    const handleLogin = () => {
        HandleValidation()
        if (formIsValid) {
            const payload = { username, password }
            dispatch(Login(payload))
        }
    }

    const responseGoogle = (res) => {
        dispatch(ResponseSuccessGoogle({tokenId:res.tokenId}))
        
    }
    if (auth.authenticate) {
        return <Redirect to="/" />;
    }

    return (
    //     <VideoBackGroiund autoPlay loop muted >
    //     <source src={Video}>
    //     </source>
    // </VideoBackGroiund>
        <>
         <Loader />
        <BoxContainer>
            <GlobalStyle color={1} />
            <SigninContainer>
                <SigninContainerLeft></SigninContainerLeft>
                <SigninContainerRight>
                <ul>
                    <li style={{
                        fontSize: '40px',
                        fontWeight:'bold'
                    }}>
                        Sign in
                    </li>
                    <li style={{marginTop:'50px'}} className='input-field'>
                        <Input
                        type='text'
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        </li>
                        {errorValidate?.username ? <li  style={{color:'red',padding:'0'}}>{errorValidate.username}</li>:null}
                    <li className='input-field'>
                        <Input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </li>
                        {errorValidate?.password ? <li  style={{color:'red',padding:'0'}}>{errorValidate.password}</li>:null}
                    <li className='submit'>
                        <Input
                                type='submit'
                                value='Sign in'
                                onClick={handleLogin}
                        />
                    </li>
                    <li >
                      <Link to='/signup' style={{color:'inherit'}}>  Sign up </Link>
                    </li>
                    <hr style={{width:'80%'}} />
                        <li style={{ marginTop: '10px' }}>
                        {/* <a href={auth.gmailURI} style={{textDecoration:'none'}} >
                                <GoogleButton style={{ margin: '0 auto' }} />
                        </a> */}
                              <GoogleLogin
                                clientId='372684868447-a443v2eg3bhe47lnebf6lui68eeekito.apps.googleusercontent.com'
                                buttonText='Sign In with Google'
                                onSuccess={responseGoogle}
                                // onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                theme={'dark'}
                             />
                        </li>
                        {!Array.isArray(auth.error) ? <li style={{color:'red'}} >{APP_BAD_REQUEST[auth.error.code]}</li> :null }
                </ul>
                </SigninContainerRight>
           </SigninContainer>
            </BoxContainer>
            </>
    )
}

export default Signin
