import React, { useState } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../Services/authServices'

function SignUp() {
    const [signupPayload, setSignupPayload] = useState({
        fullName: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center w-full mt-8 gap-6'>
            <h1 className='text-4xl'>Shortify</h1>
            <div className='flex flex-col items-center w-full gap-4'>
                <TextInput
                    handleChange={(val) => setSignupPayload({...signupPayload, fullName: val})}
                    type='text'
                    label='Full Name'
                    placeholder='enter your Fullname'
                />
                <TextInput
                    handleChange={(val) => setSignupPayload({...signupPayload, email: val})}
                    type='text'
                    label='E-mail'
                    placeholder='enter your email'
                />
                <TextInput
                    handleChange={(val) => setSignupPayload({...signupPayload, password: val})}
                    type='password'
                    label='Password'
                    placeholder='enter your password'
                />
                <Button 
                    handleClick={()=>signup(signupPayload, navigate)}
                    text='Sign up'
                    type='primary'
                />
            </div>
                <p className='text-gray-600'>Already have an account ? <Link to='/login' className='text-[#417B5A]'>Login</Link></p>
        </div>
    )
}

export default SignUp