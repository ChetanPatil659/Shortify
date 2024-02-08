import React, { useState } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../Services/authServices'

function Login() {
    const [loginPayload, setLoginPayload] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center w-full mt-8 gap-6'>
            <h1 className='text-4xl'>Shortify</h1>
            <div className='flex flex-col items-center w-full gap-4'>
                <TextInput
                    handleChange={(val) => setLoginPayload({ ...loginPayload, email: val })}
                    type='text'
                    label='E-mail'
                    placeholder='enter your email'
                />
                <TextInput
                    handleChange={(val) => setLoginPayload({ ...loginPayload, password: val })}
                    type='password'
                    label='Password'
                    placeholder='enter your password'
                />
                <Button
                    handleClick={() => login(loginPayload, navigate)}
                    text='Login'
                    type='primary'
                />
            </div>
            <p className='text-gray-600'>Don't have an account ? <Link to='/signup
            ' className='text-[#417B5A]'>Sign up</Link></p>
        </div>
    )
}

export default Login