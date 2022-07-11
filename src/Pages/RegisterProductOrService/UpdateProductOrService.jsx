import React, { useContext, useState } from 'react'
import { Post, Update } from '../../Adapters/xhr';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

export default function UpdateProductOrService({updateData, setOpen}) {

  console.log("updateData: ", updateData)
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const newFormValues = formValues;
    newFormValues[e.target.name] = e.target.value;
    setFormValues(newFormValues)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await Update(`productOrService/updateProductOrService/${updateData._id}`, {...formValues, token: loggedInUser.user_token})
      
      toast.success("Product or Service Update successfull.")
      setLoading(false)
      setOpen(false)
    } catch (error) {
      toast.warn("Try Again!")
      setLoading(false)
      setOpen(false)
    }

    console.log({formValues})
  }

  return (
    <div className='w-[500px] p-5 mx-auto'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl '>Update Product Or Service</h1>  
        <CustomTextField name="name" value={updateData.name} onChange={handleChange} label="Name" required={true} />
        <CustomTextField name="description" value={updateData.description} onChange={handleChange} label="Description" required={true} />
        <CustomTextField name="expire" value={updateData.expire} onChange={handleChange} type="date" label="Expiry Date" required={true} />
        <CustomTextField name="price" value={updateData.price} onChange={handleChange} label="Cost Price" type='number' required={true} />
        <CustomTextField name="quantity" value={updateData.quantity} onChange={handleChange} label="Quantity" type="number" required={true} />
        <CustomTextField name="unit" value={updateData.unit} onChange={handleChange} label="Units" type='number' required={true} />
        
        
        <SubmitButton loading={loading}/>
      </form>
    </div>
  )
}
