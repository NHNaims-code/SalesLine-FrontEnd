import React, { useContext, useEffect, useState } from 'react'
import { Post } from '../../Adapters/xhr';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

export default function AddCustomer() {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  useEffect(() => {
    if(!loggedInUser.user.isAdmin){
      history.push('/login')
    }
  }, [])

  const handleChange = (e) => {
    const newFormValues = formValues;
    newFormValues[e.target.name] = e.target.value;
    setFormValues(newFormValues)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await Post("customer/addCustomer", {...formValues, token: loggedInUser.user_token, organisation:loggedInUser.user.organisation})
      
      toast.success("Customer added successfull.")
      setLoading(false)
    } catch (error) {
      toast.warn("Try Again!")
      setLoading(false)
    }

    console.log({formValues})
  }

  return (
    <div className='w-[50%] mx-auto'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl'>Add A Customer</h1>  
        <CustomTextField name="customer_name" onChange={handleChange} label="Customer Name" required={true} />
        <CustomTextField name="description" onChange={handleChange} label="Description" required={true} />
        <CustomTextField name="address" onChange={handleChange} label="Address" required={true} />
        <CustomTextField name="phone" onChange={handleChange} label="Phone" required={true} />
        <CustomTextField name="type" onChange={handleChange} label="Type" required={true} />
        
        
        <SubmitButton loading={loading}/>
      </form>
    </div>
  )
}
