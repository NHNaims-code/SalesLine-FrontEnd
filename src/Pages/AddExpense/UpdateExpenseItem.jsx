import React, { useContext, useState } from 'react'
import { Post, Update } from '../../Adapters/xhr';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

export default function UpdateExpenseItem({updateData, setOpen}) {

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
      const response = await Update(`expenseItem/updateExpenseItem/${updateData._id}`, {...formValues, token: loggedInUser.user_token})
      toast.success("Expense Item Updated successfull.")
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
    <div className='w-[500px] p-5  mx-auto'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl'>Update Expense Item</h1>  
        <CustomTextField value={updateData.item_name} name="item_name" onChange={handleChange} label="Item Name" required={true} />
        <CustomTextField value={updateData.description} name="description" onChange={handleChange} label="Description" required={true} />
        <CustomTextField value={updateData.amount} name="amount" onChange={handleChange} label="Amount" type='number' required={true} />                
        
        <SubmitButton loading={loading}/>
      </form>
    </div>
  )
}
