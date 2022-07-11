import React, { useContext, useEffect, useState } from 'react'
import { Post } from '../../Adapters/xhr';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

export default function RegisterProductOrService() {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const newFormValues = formValues;
    newFormValues[e.target.name] = e.target.value;
    setFormValues(newFormValues)
  }

  const history = useHistory()
  useEffect(() => {
    if(!loggedInUser.user.isAdmin){
      history.push('/login')
    }
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await Post("productOrService/addProductOrService", {...formValues, token: loggedInUser.user_token, organisation:loggedInUser.user.organisation})
      
      toast.success("Product or Service Register successfull.")
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
        <h1 className='text-center text-2xl '>Register Product Or Service</h1>  
        <CustomTextField name="name" onChange={handleChange} label="Name" required={true} />
        <CustomTextField name="description" onChange={handleChange} label="Description" required={true} />
        <CustomTextField name="expire" onChange={handleChange} type="date" label="Expiry Date" required={true} />
        <CustomTextField name="price" onChange={handleChange} label="Cost Price" type='number' required={true} />
        <CustomTextField name="quantity" onChange={handleChange} label="Quantity" type="number" required={true} />
        <CustomTextField name="unit" onChange={handleChange} label="Units" type='number' required={true} />
        
        
        <SubmitButton loading={loading}/>
      </form>
    </div>
  )
}
