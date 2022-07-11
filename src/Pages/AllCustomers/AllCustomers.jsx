import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Delete, Post, Update } from '../../Adapters/xhr';
import { UserContext } from '../../App';
import MUIDialog from '../../components/Dailog/MUIDialog';
import DataTable from '../../components/DataTable/MUITable';
import UpdateCustomer from '../AddCustomer/UpdateCustomer';

export default function AllCustomers() {

  const [allCustomers, setAllCustomers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [updateData, setUpdateData] = useState(null)

  const getAllCustomers = async() => {
    try {
      const response = await Post("customer",{token: loggedInUser.token})
      console.log("log:", response)
      if(!response.data == false){
        setAllCustomers(response.data)
      }
      setLoading(false)
    } catch (error) {
      toast.warn("Try Again")
      setLoading(false)
    }
  }

  const history = useHistory()
  useEffect(() => {
    if(!loggedInUser.user.isAdmin){
      history.push('/login')
    }
  }, [])

  useEffect(() => {
    getAllCustomers()
  }, [open])

  const columns = [
      { field: 'customer_name', title: 'Customer Name', width: 70 },
      { field: 'description', title: 'Description', width: 70 },
      { field: 'address', title: 'Address', width: 70 },
      { field: 'phone', title: 'Phone', width: 70 },
      { field: 'type', title: 'Type', width: 70 },
  ]


  const handleEdit = async(rowData) => {
    console.log("hit")
    await Swal.fire({
      title: `Edit Customer`,
      html:
        `<input id="customer_name" class="swal2-input" value="${rowData.customer_name}">` +
        `<input id="description" class="swal2-input" value="${rowData.description}">` +
        `<input id="address" class="swal2-input" value="${rowData.address}">` +
        `<input id="phone" class="swal2-input" value="${rowData.phone}">` +
        `<input id="type" class="swal2-input" value="${rowData.type}">` ,
      focusConfirm: false,
      preConfirm: async() => {
          const customer_name = document.getElementById('customer_name').value
          const description = document.getElementById('description').value
          const address = document.getElementById('address').value
          const phone = document.getElementById('phone').value
          const type = document.getElementById('type').value

          console.log("result : ", {customer_name, description, address, phone, type})
          try {
            const updatedResult = await Update(`customer/updateCustomer/${rowData._id}`, {customer_name, description, address, phone, type})
            console.log("updated result :", updatedResult)
            setAllCustomers(updatedResult.data)
          } catch (error) {
            toast.warn('Try Again!')
          }
      }
    })
  }

  const handleDelete = async(rowData) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {


          Delete(`customer/deleteCustomer/${rowData._id}`).then(result => {
            setAllCustomers(result.data)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }).catch(err => {
            toast.warn("Try Again!")
          })         
        
      }
    })
  }
  
  return (
    <div>
      <DataTable loading={loading} tableTitle="All Customers" columns={columns} rows={allCustomers} handleEdit={(rowData)=>{setUpdateData(rowData); setOpen(true)}} handleDelete={handleDelete}/>
      <MUIDialog open={open} setOpen={setOpen} content={<UpdateCustomer updateData={updateData} setOpen={setOpen}/>}/>
    </div>
  )
}
