import React, { useState, useEffect} from 'react'
import { BoxContainer, SignupContainer, SignupContainerLeft, SignupContainerRight } from './signup.style'
import Input from '../../component/ui/input/input' 
import { Link } from 'react-router-dom'
import { GlobalStyle } from '../../component/ui/globalStyle/global.style'
import { useDispatch, useSelector } from 'react-redux'
import { Signup as register , ResponseSuccessGoogle, ClearError } from '../../action/auth/authAction'
import GoogleLogin from 'react-google-login'
import { Redirect } from "react-router-dom";
import Loader from '../../component/loader/loader'
import { emailRegex, telRegex } from '../../utils/regex'
import { APP_BAD_REQUEST } from '../../service-share/const/bad-request.const'

function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const [errorValidate, setErrorValidate] = useState({})
    let error = {}
    let formIsValid = true

    useEffect(() => {
        dispatch(ClearError())
    }, [])

    const HandleValidation = () => {
        if (!username) {
            formIsValid = false
            error = !error?.username ? { ...error, username: 'ระบุ' } : error
        
        }
        if (username.length <= 6) {
            formIsValid = false
            error = !error?.username ? { ...error, username: '6' } : error
            
        }
        if (!password) {
            formIsValid = false
            error = !error?.password ? { ...error, password: 'ระบุ' } : error
        }
        if (password.length <= 6) {
            formIsValid = false
            error = !error?.password ? { ...error, password: 'กรุณารุะบุ อย่างน้อย 6 ตัวอักษร' } : error
        }
        if (!password) {
            formIsValid = false
            error = !error?.confirmPassword ? { ...error, confirmPassword: 'ระบุ' } : error
        }
        if (password !== confirmPassword) {
            formIsValid = false
            error = !error?.confirmPassword ? { ...error, confirmPassword: 'รหัสผ่านทั้งสองไม่ตรงกัน' } : error
        }
        if (!emailRegex.test(email)) {
            formIsValid = false
            error = !error?.email ? { ...error, email: 'อีเมลล์ไม่ถูกต้อง' } : error
        }
        if (!firstName) {
            formIsValid = false
            error = !error?.firstName ? { ...error, firstName: 'ระบุ' } : error
        }
        if (!lastName) {
            formIsValid = false
            error = !error?.lastName ? { ...error, lastName: 'ระบุ' } : error
        }
        if (!telRegex.test(contactNumber)) {
            formIsValid = false
            error = !error?.contactNumber ? { ...error, contactNumber: 'เบอร์โทรศัพท์ไม่ถูกต้อง' } : error
        }
        setErrorValidate(error)
      
    }

    const responseGoogle = (res) => {
        dispatch(ResponseSuccessGoogle({tokenId:res.tokenId}))
        
    }

    const HandleSignup = () => {
        HandleValidation()
        if (formIsValid) {
            const payload = {
                username,
                password,
                confirmPassword,
                firstName,
                lastName,
                contactNumber,
                email

            }
            dispatch(register(payload))
        }
    }

    if (auth.authenticate) {
        return <Redirect to="/" />;
    }
     

    return (
        <>
        <Loader />
        <BoxContainer>
            <GlobalStyle color={1}/>
            <SignupContainer>
                <SignupContainerLeft>1</SignupContainerLeft>
                <SignupContainerRight>
                             <ul>
                <li style={{
                    fontSize: '40px',
                    fontWeight:'bold'
                }}>
                    Sign up
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
                            {Array.isArray(auth.error.data) ? auth.error.data.map((err,index) => err.username ? <li key={ index } style={{color:'red',padding:'0'}}>{APP_BAD_REQUEST[err.username.code]}</li> : null) :null }
                <li className='input-field'>
                    <Input
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                        </li>
                        {errorValidate?.password ? <li  style={{color:'red',padding:'0'}}>{errorValidate.password}</li>:null}
                    <li className='input-field'>
                    <Input
                        type='password'
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                        </li>
                        {errorValidate?.confirmPassword ? <li  style={{color:'red',padding:'0'}}>{errorValidate.confirmPassword}</li>:null}
                        <li className='input-field'>
                    <Input
                        type='text'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                            </li>
                        {errorValidate?.email ? <li  style={{color:'red',padding:'0'}}>{errorValidate.email}</li>:null}
                            {Array.isArray(auth.error.data) ? auth.error.data.map((err,index) => err.email ? <li key={index} style={{color:'red',padding:'0'}}>{APP_BAD_REQUEST[err.email.code]}</li> : null) :null }
                <li className='input-field'>
                    <Input
                    type='text'
                    placeholder="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                            </li>
                        {errorValidate?.firstName ? <li  style={{color:'red',padding:'0'}}>{errorValidate.firstName}</li>:null}
                    <li className='input-field'>
                    <Input
                    type='text'
                    placeholder="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                            </li>
                            {errorValidate?.lastName ? <li  style={{color:'red',padding:'0'}}>{errorValidate.lastName}</li>:null}
                    <li className='input-field'>
                    <Input
                    type='text'
                    placeholder="phone number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    />
                            </li>
                {errorValidate?.contactNumber ? <li  style={{color:'red',padding:'0'}}>{errorValidate.contactNumber}</li>:null}
                {Array.isArray(auth.error.data) ? auth.error.data.map((err) => err.contactNumber ? <li style={{color:'red',padding:'0'}}>{err.contactNumber}</li> : null) :null }
                <li className='submit'>
                    <Input
                        type='submit'
                        value='Sign up'
                        onClick={ HandleSignup}
                    />
                </li>
                <li >
                  <Link to='/' style={{color:'inherit'}}>  Sign in </Link>
                </li>
                <hr style={{width:'80%'}} />
                <li style={{ marginTop: '10px' }}>
                        <GoogleLogin
                                clientId='372684868447-a443v2eg3bhe47lnebf6lui68eeekito.apps.googleusercontent.com'
                                buttonText='Sign Up with Google'
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                theme={'dark'}
                             />
                            </li>
                            {!Array.isArray(auth.error) ? <li style={{color:'red',padding:'0'}}>{APP_BAD_REQUEST[auth.error.code]}</li> : null}
            </ul>
                </SignupContainerRight>
            </SignupContainer>
            </BoxContainer>
            </>
    )
}
export default Signup
