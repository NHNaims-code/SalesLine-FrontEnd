import React, { useContext, useState } from 'react'
import { Post } from '../../Adapters/xhr';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

export default function AddExpenseItem() {

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
      const response = await Post("expenseItem/addExpenseItem", {...formValues, token: loggedInUser.user_token, organisation:loggedInUser.user.organisation})
      toast.success("Expense Item added successfull.")
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
        <h1 className='text-center text-2xl'>Add Expense Item</h1>  
        <CustomTextField name="item_name" onChange={handleChange} label="Item Name" required={true} />
        <CustomTextField name="description" onChange={handleChange} label="Description" required={true} />
        <CustomTextField name="amount" onChange={handleChange} label="Amount" type='number' required={true} />                
        
        <SubmitButton loading={loading}/>
      </form>
    </div>
  )
}
