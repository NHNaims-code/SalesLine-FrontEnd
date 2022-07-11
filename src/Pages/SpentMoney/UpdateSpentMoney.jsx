import React, { useContext, useState } from 'react'
import { Post, Update } from '../../Adapters/xhr';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function UpdateSpentMoney({updateData, setOpen}) {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [formValues, setFormValues] = useState({})

  const [allExpenseItems, setAllExpenseItems] = useState([]);

  const [seletedExpenseItem, setSelectedExpenseItem] = useState('');




  const handleChange = (e) => {
    const newFormValues = formValues;
    newFormValues[e.target.name] = e.target.value;
    setFormValues(newFormValues)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()


      try {
        const response = await Update(`spent/updateSpent/${updateData._id}`, {...formValues, token: loggedInUser.user_token})
        
        toast.success("Spent Money added successfull.")
        setOpen(false)
      } catch (error) {
        toast.warn("Try Again!")
        setOpen(false)
      }
  
      console.log({formValues})
  }



  return (
    <div className='w-[500px] p-5 mx-auto'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl'>Update Spent Money (Expendutare)</h1>  

        <CustomTextField value={updateData.description} name="description" onChange={handleChange} label="Description" required={false} />
        <CustomTextField value={updateData.cost_price} name="cost_price" onChange={handleChange} label="Cost Price" required={true} />
        <CustomTextField value={updateData.unit} name="unit" onChange={handleChange} label="Units" required={true} />
        <CustomTextField value={updateData.date_time} name="date_time" type="date" onChange={handleChange} label="Date Time" required={true} />
        
        
        
        
        <SubmitButton/>
      </form>
    </div>
  )
}
