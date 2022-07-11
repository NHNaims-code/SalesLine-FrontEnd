import { Button, Checkbox, filledInputClasses, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { register } from '../../Adapters/auth/register';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';

export default function Register() {

  const history = useHistory()

  const [formValues, setFormValues] = useState({});
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const newFormValues = formValues;
    newFormValues[event.target.name] = event.target.value;
    setFormValues(newFormValues);
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log({formValues})
    setLoading(true)

    try {

          const response = await register("register", {...formValues, isAdmin})
          if(response?.data?.secret_code==true){
            toast.success("Admin Register Successfull")
            history.push('/login')
          }else if(response?.data?.secret_code==false){
            toast.warn("Admin Secret Code not Matched")
          }else if(response?.data?.secret_code==null){
            toast.success("User Register Successfull")
            history.push('/login')
          }
          setLoading(false)
          
        } catch (error) {
          toast.warn("Register Failed. Try Again")
          setLoading(false)
    }
  }


  const handleAdminChange = (e) => {
    setIsAdmin(e.target.checked)
  }

  return (
    <div className='w-[25%] mx-auto'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl mt-[70px]'>Register</h1>
        <CustomTextField name="username" onChange={handleChange} label="Username" type='text' required={true} />
        <CustomTextField name="organisation" onChange={handleChange} label="Organisation" type='text' required={true} />
        <CustomTextField name="email" onChange={handleChange} label="Email" type='email' required={true} />
        <CustomTextField name="password" onChange={handleChange} label="Password" type='password' required={true} />
        {
          isAdmin&&<CustomTextField name="secret_code" onChange={handleChange} label="Secret Code" required={true} />
        }
        <SubmitButton loading={loading}/>
      </form>
      <div className='flex justify-center mt-5'>
        <FormGroup>
            <FormControlLabel control={<Checkbox onChange={handleAdminChange}/>} label="Is Admin"/>
        </FormGroup>
      </div>
    </div>
  )
}
