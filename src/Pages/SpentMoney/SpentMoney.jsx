import React, { useContext, useState } from 'react'
import { Post } from '../../Adapters/xhr';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function SpentMoney() {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [formValues, setFormValues] = useState({})

  const [allExpenseItems, setAllExpenseItems] = useState([]);

  const [seletedExpenseItem, setSelectedExpenseItem] = useState('');

  const getAllExpenseItmes = async() => {
    try {
      const response = await Post("expenseItem",{token: loggedInUser.token})
      if(!response.data == false){                
        console.log("log:", response)
        setAllExpenseItems(response.data)
      }
    } catch (error) {
      toast.warn("Try Again")
    }
  }


  useEffect(() => {
    getAllExpenseItmes()
  }, [])

  const handleChange = (e) => {
    const newFormValues = formValues;
    newFormValues[e.target.name] = e.target.value;
    setFormValues(newFormValues)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(seletedExpenseItem == ""){
      Swal.warn("Please Select a Expnese Item")
    }else{
      try {
        const response = await Post("spent/addSpent", {...formValues, item: seletedExpenseItem, token: loggedInUser.user_token, organisation:loggedInUser.user.organisation})
        
        toast.success("Spent Money added successfull.")
      } catch (error) {
        toast.warn("Try Again!")
      }
  
      console.log({formValues})
    }
  }

  const selectHandleChangeExpenseItem = (event) => {
    setSelectedExpenseItem(event.target.value);
  };


  return (
    <div className='w-[50%] mx-auto'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl'>Spent Money (Expendutare)</h1>  
        <FormControl variant="standard" sx={{marginTop: '25px'}}>
          <InputLabel id="demo-simple-select-standard-label">Select One</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={seletedExpenseItem}
            onChange={selectHandleChangeExpenseItem}
            label="Item Name"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              allExpenseItems.map((item, index) => {
                return(
                  <MenuItem value={item._id}>{item.item_name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>

        <CustomTextField name="description" onChange={handleChange} label="Description" required={false} />
        <CustomTextField name="cost_price" onChange={handleChange} label="Cost Price" required={true} />
        <CustomTextField name="unit" onChange={handleChange} label="Units" required={true} />
        <CustomTextField name="date_time" type="date" onChange={handleChange} label="Date Time" required={true} />
        
        
        
        
        <SubmitButton/>
      </form>
    </div>
  )
}
