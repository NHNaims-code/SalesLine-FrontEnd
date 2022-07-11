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

export default function AddPayment() {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [formValues, setFormValues] = useState({})

  const [allCustomers, setAllCustomers] = useState([]);
  const [allProductOrServices, setAllProductOrServices] = useState([])
  const [loading, setLoading] = useState(false)

  const getAllCustomers = async() => {
    try {
      const response = await Post("customer",{token: loggedInUser.token})
      if(!response.data == false){                
        setAllCustomers(response.data)
        console.log("log:", response)
      }
    } catch (error) {
      toast.warn("Try Again")
    }
  }

  const getAllProductOrServices = async() => {
    try {
      const response = await Post("productOrService",{token: loggedInUser.token})
      console.log("log:", response)
      if(!response.data == false){                
        setAllProductOrServices(response.data)
      }
    } catch (error) {
      toast.warn("Try Again")
    }
  }

  useEffect(() => {
    getAllCustomers()
    getAllProductOrServices()
  }, [])

  const handleChange = (e) => {
    const newFormValues = formValues;
    newFormValues[e.target.name] = e.target.value;
    setFormValues(newFormValues)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    if(loggedInUser.user.isAdmin){

      if(selectedCustomer == ""){
        Swal.warn("Please Select a Customer")
      }else if(selectedProduct == ""){
        Swal.warn("Please Select a Product or Service")
      }else{
        try {
          const response = await Post("payment/addPayment", {...formValues, customer: selectedCustomer, product: selectedProduct, token: loggedInUser.user_token, organisation:loggedInUser.user.organisation})
          
          toast.success("Payment added successfull.")
          setLoading(false)
        } catch (error) {
          toast.warn("Try Again!")
          setLoading(false)
        }
    
        console.log({formValues})
      }
    }else{
      
        try {
          const response = await Post("payment/addPayment", {...formValues, token: loggedInUser.user_token, organisation:loggedInUser.user.organisation})
          
          toast.success("Payment added successfull.")
          setLoading(false)
        } catch (error) {
          toast.warn("Try Again!")
          setLoading(false)
        }
      
    }

  }

  const [selectedCustomer, setSelectedCustomer] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState('');

  const selectHandleChangeCustomer = (event) => {
    setSelectedCustomer(event.target.value);
  };
  const selectHandleChangeProduct = (event) => {
    setSelectedProduct(event.target.value);
  };


  return (
    <div className='w-[50%] mx-auto'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl '>Add Payment</h1>  
        {
          loggedInUser.user.isAdmin &&
          <FormControl variant="standard" sx={{marginTop: '25px'}}>
          <InputLabel id="demo-simple-select-standard-label">Select A Product or Service</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedProduct}
            onChange={selectHandleChangeProduct}
            label="Product/Service"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              allProductOrServices.map((product, index) => {
                return(
                  <MenuItem value={product._id}>{product.name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        }

        <CustomTextField name="amount" onChange={handleChange} label="Amount" required={true} />

        {
          loggedInUser.user.isAdmin &&
          <FormControl variant="standard" sx={{marginTop: '25px'}}>
          <InputLabel id="demo-simple-select-standard-label">Select Customer</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedCustomer}
            onChange={selectHandleChangeCustomer}
            label="Customer"
            required={true}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              allCustomers.map((customer, index) => {
                return(
                  <MenuItem value={customer._id}>{customer.customer_name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        }
        <CustomTextField name="invoice_no" onChange={handleChange} label="Invoice No." required={true} />
        <CustomTextField name="note" onChange={handleChange} label="Note" required={false} />
        
        
        
        <SubmitButton loading={loading}/>
      </form>
    </div>
  )
}
