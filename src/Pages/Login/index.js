import { Button, TextField } from '@mui/material'
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react'
import { Post } from '../../Adapters/xhr';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

export default function Login() {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };
  const history = useHistory()


  const handleChange = (e) => {
    const newFormValues = formValues;
    newFormValues[e.target.name] = e.target.value;
    setFormValues(newFormValues)
  }

  const loginSubmit = async(e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const response = await Post("login", formValues)
      setLoggedInUser({user_token: response.data.token, user: response.data.user})
      Cookies.set("user_token", response.data.token)
      toast.success("Login successfull.")
      history.push(from)
      setLoading(false)
    } catch (error) {
      toast.warn("Email or Password not Matched")
      setLoading(false)
    }

    console.log({formValues})
  }

  return (
    <div className='w-[25%] mx-auto'>
      <form className='flex flex-col' onSubmit={loginSubmit}>
        <h1 className='text-center text-2xl mt-[70px]'>Login</h1>  
        <CustomTextField name="email" onChange={handleChange} label="Email" type='email' required={true} />
        <CustomTextField name="password" onChange={handleChange} label="Password" type='password' required={true} />
        <SubmitButton loading={loading}/>
      </form>
    </div>
  )
}
